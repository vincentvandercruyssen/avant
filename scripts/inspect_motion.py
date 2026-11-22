#!/usr/bin/env python3
"""Inspect After Effects (.aep), MP4 exports, and ZIP archives in Motion submissions.

Generates dense contact sheets (default 4 frames/s via ffmpeg) alongside a technical
report comparing the AE project (compositions, layers, fonts, effects) with the
rendered MP4 video (resolution, fps, duration, black frames).
"""

import argparse
import os
import re
import struct
import subprocess
import tempfile
import zipfile
from pathlib import Path

IGNORE_FONTS = {
    "Myriad-Roman",
    "Helvetica",
    "AdobeInvisFont",
    "Normal",
    "DVA",
    "Hard",
    "Soft",
    "Auto",
    "None",
}

BASIC_ADBE_PREFIXES = (
    "Vector",
    "Transform",
    "Text",
    "Root",
    "Position",
    "Scale",
    "Opacity",
    "Rotation",
    "Anchor",
    "Mask",
    "Audio",
    "Time",
    "Layer",
    "Group",
    "Effect",
    "Data",
    "Marker",
    "MTrackers",
    "Material",
    "Geometry",
    "Plane",
    "Camera",
    "Light",
    "Expressions",
    "Accepts",
    "Adv Blend",
    "Ambient",
    "Appears",
    "Bevel",
    "Blend Options",
    "Casts",
    "Diffuse",
    "Envir",
    "Specular",
    "Shininess",
    "Metal",
    "Calder",
    "Escher",
    "Extrsn",
    "Fresnel",
    "Glossiness",
    "Index of Refraction",
    "Iris",
    "Orientation",
    "Reflection",
    "Rotate",
    "Shadow",
    "Source Options",
    "Transp",
)


def inspect_aep(aep_path: Path) -> dict:
    """Extract compositions, counts, fonts, and effects from an .aep binary."""
    data = aep_path.read_bytes()

    comps = []
    idx = 0
    while True:
        pos = data.find(b"cdta", idx)
        if pos == -1:
            break
        sz = struct.unpack(">I", data[pos + 4 : pos + 8])[0]
        cdta = data[pos + 8 : pos + 8 + sz]
        pre = data[max(0, pos - 120) : pos]
        names = re.findall(rb"Utf8.{4}([^\x00]{2,60})", pre)
        cname = names[-1].decode("utf-8", errors="ignore") if names else "?"
        u32s = [struct.unpack(">I", cdta[i : i + 4])[0] for i in range(0, min(80, len(cdta)), 4)]
        tb = u32s[6] or 30720
        dur = round(u32s[11] / tb, 2) if len(u32s) > 11 and tb else 0
        fps = round(u32s[2] / u32s[1], 2) if len(u32s) > 2 and u32s[1] else 0
        w = struct.unpack(">H", cdta[140:142])[0] if len(cdta) >= 142 else 0
        h = struct.unpack(">H", cdta[142:144])[0] if len(cdta) >= 144 else 0
        comps.append({"name": cname.removesuffix("LIST"), "width": w, "height": h, "fps": fps, "duration_s": dur})
        idx = pos + 4

    fonts = []
    idx = 0
    while True:
        pos = data.find(b"btdk", idx)
        if pos == -1:
            break
        sz = struct.unpack(">I", data[pos + 4 : pos + 8])[0]
        chunk = data[pos + 8 : pos + 8 + sz]
        for match in re.finditer(rb"\xfe\xff", chunk):
            sub = chunk[match.start() + 2 : match.start() + 80]
            end = sub.find(b")")
            if end != -1:
                sub = sub[:end]
            txt = sub.decode("utf-16-be", errors="ignore").strip()
            if txt and re.match(r"^[A-Za-z][A-Za-z0-9_-]{2,}$", txt) and txt not in IGNORE_FONTS and txt not in fonts:
                fonts.append(txt)
        idx = pos + 4

    effects = sorted(
        set(
            e
            for e in (m.decode("ascii", "ignore") for m in re.findall(rb"ADBE ([A-Za-z0-9 _-]{3,35})", data))
            if not e.startswith(BASIC_ADBE_PREFIXES)
        )
    )

    return {
        "file": aep_path.name,
        "comps": comps,
        "shape_layers": data.count(b"Shape Layer") // 2,
        "text_layers": data.count(b"ADBE Text Document"),
        "time_remapping": b"ADBE Time Remapping" in data,
        "font_and_text_tokens": fonts,
        "effects": effects,
    }


def inspect_mp4(mp4_path: Path, out_sheet: Path, fps: int = 4) -> dict:
    """Probe MP4 metadata and render a dense contact sheet at `fps` frames per second."""
    probe_cmd = [
        "ffprobe",
        "-v",
        "error",
        "-select_streams",
        "v:0",
        "-show_entries",
        "stream=codec_name,width,height,r_frame_rate,duration,nb_frames",
        "-of",
        "default=noprint_wrappers=1",
        str(mp4_path),
    ]
    probe_out = subprocess.check_output(probe_cmd, text=True).strip().splitlines()
    meta = dict(line.split("=", 1) for line in probe_out if "=" in line)

    dur = float(meta.get("duration", 0) or 0)
    total_thumbs = max(1, int(round(dur * fps)))
    cols = 8
    rows = max(1, (total_thumbs + cols - 1) // cols)

    out_sheet.parent.mkdir(parents=True, exist_ok=True)
    sheet_cmd = [
        "ffmpeg",
        "-y",
        "-v",
        "error",
        "-i",
        str(mp4_path),
        "-vf",
        f"fps={fps},scale=220:-1,tile={cols}x{rows}",
        "-frames:v",
        "1",
        str(out_sheet),
    ]
    subprocess.run(sheet_cmd, check=True)
    return {"file": mp4_path.name, "meta": meta, "sheet": str(out_sheet)}


def inspect_submission_dir(target_dir: Path, out_dir: Path, fps: int) -> None:
    """Inspect all .zip, .aep, and .mp4 submissions inside a folder."""
    with tempfile.TemporaryDirectory() as tmp:
        tmp_path = Path(tmp)
        for item in sorted(target_dir.iterdir()):
            if item.is_dir():
                sub_work = tmp_path / item.name
                sub_work.mkdir(parents=True, exist_ok=True)
                print(f"\n=== {item.name} ===")
                for f in sorted(item.iterdir()):
                    print(f"  Submitted: {f.name} ({f.stat().st_size} bytes)")
                    if f.suffix.lower() == ".zip":
                        with zipfile.ZipFile(f, "r") as zf:
                            for entry in zf.namelist():
                                if "__MACOSX" not in entry:
                                    print(f"    [ZIP] {entry}")
                            zf.extractall(sub_work)
                search_root = sub_work if any(sub_work.iterdir()) else item
                for aep in sorted(search_root.rglob("*.aep")):
                    if "__MACOSX" in str(aep) or "Auto-Save" in str(aep) or "tmpAEtoAME" in str(aep):
                        continue
                    print("  AEP:", inspect_aep(aep))
                for mp4 in sorted(search_root.rglob("*.mp4")):
                    if "__MACOSX" in str(mp4):
                        continue
                    safe = re.sub(r"[^A-Za-z0-9_-]+", "_", f"{item.name}_{mp4.stem}")
                    sheet = out_dir / f"{safe}_fps{fps}.jpg"
                    print("  MP4:", inspect_mp4(mp4, sheet, fps=fps))


def main() -> None:
    parser = argparse.ArgumentParser(description="Inspect Motion submissions (.zip, .aep, .mp4).")
    parser.add_argument("submission_dir", type=Path, help="Folder containing student submission folders")
    parser.add_argument("--out", type=Path, default=Path("_inspect_sheets"), help="Output folder for contact sheets")
    parser.add_argument("--fps", type=int, default=4, help="Frames per second to sample for contact sheets (default: 4)")
    args = parser.parse_args()
    inspect_submission_dir(args.submission_dir, args.out, args.fps)


if __name__ == "__main__":
    main()
