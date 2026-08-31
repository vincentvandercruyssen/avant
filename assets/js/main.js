// Zoek naar alle divs met de klasse 'table_layoutfixed'
const fixedLayoutDivs = document.querySelectorAll('.table_layoutfixed');

fixedLayoutDivs.forEach(div => {
    // Zoek de eerstvolgende table na de huidige 'table_layoutfixed'-div
    let nextTable = div.nextElementSibling;
    while (nextTable && nextTable.tagName !== 'TABLE') {
        nextTable = nextTable.nextElementSibling;
    }

    // Als we een table gevonden hebben, pas de CSS-stijl toe
    if (nextTable) {
        nextTable.style.tableLayout = 'fixed';
    }
});

// Zoek naar alle divs met de klasse 'table_centertext'
const centerTextDivs = document.querySelectorAll('.table_centertext');

centerTextDivs.forEach(div => {
    // Zoek de eerstvolgende table na de huidige 'table_centertext'-div
    let nextTable = div.nextElementSibling;
    while (nextTable && nextTable.tagName !== 'TABLE') {
        nextTable = nextTable.nextElementSibling;
    }

    // Als we een table gevonden hebben, pas de CSS-stijl toe op alle td's
    if (nextTable) {
        const tds = nextTable.querySelectorAll('td');
        tds.forEach(td => {
            td.style.textAlign = 'center';
        });
    }
});


// Zoek naar alle divs met de klasse 'table_baseline'
const baselineDivs = document.querySelectorAll('.table_baseline');

baselineDivs.forEach(div => {
    // Zoek de eerstvolgende table na de huidige 'table_baseline'-div
    let nextTable = div.nextElementSibling;
    while (nextTable && nextTable.tagName !== 'TABLE') {
        nextTable = nextTable.nextElementSibling;
    }

    // Als we een table gevonden hebben, pas de CSS-stijl toe op alle td's
    if (nextTable) {
        const tds = nextTable.querySelectorAll('td');
        tds.forEach(td => {
            td.style.verticalAlign = 'baseline';
        });
    }
});

// TOC Scroll Spy: Toon H4 subonderdelen enkel wanneer het actieve onderdeel in beeld is
(function initTocScrollSpy() {
    const toc = document.querySelector('header nav#TableOfContents');
    if (!toc) return;

    const tocLinks = Array.from(toc.querySelectorAll('a[href^="#"]'));
    if (tocLinks.length === 0) return;

    const headings = [];
    const headingToLinkMap = new Map();

    tocLinks.forEach(link => {
        const rawHref = link.getAttribute('href');
        if (!rawHref || rawHref === '#') return;
        const id = decodeURIComponent(rawHref.slice(1));
        const target = document.getElementById(id);
        if (target) {
            headings.push(target);
            headingToLinkMap.set(target, link);
        }
    });

    if (headings.length === 0) return;

    function updateActiveToc() {
        const scrollY = window.scrollY || window.pageYOffset;
        const viewportHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        let activeHeading = null;

        // Als we onderaan de pagina zijn beland, markeer de laatste kop
        if (scrollY + viewportHeight >= docHeight - 40) {
            activeHeading = headings[headings.length - 1];
        } else {
            // Zoek de laatste kop die boven de drempelwaarde van het venster ligt
            const threshold = 120;
            for (let i = 0; i < headings.length; i++) {
                const rect = headings[i].getBoundingClientRect();
                if (rect.top <= threshold) {
                    activeHeading = headings[i];
                } else {
                    break;
                }
            }

            // Als we nog boven de eerste kop zijn, activeer de eerste kop als deze in beeld komt
            if (!activeHeading && headings.length > 0) {
                const firstRect = headings[0].getBoundingClientRect();
                if (firstRect.top < viewportHeight * 0.5) {
                    activeHeading = headings[0];
                }
            }
        }

        // Reset actieve klassen
        toc.querySelectorAll('.is-active, .has-active').forEach(el => {
            el.classList.remove('is-active', 'has-active');
        });

        if (!activeHeading) return;

        const activeLink = headingToLinkMap.get(activeHeading);
        if (activeLink) {
            activeLink.classList.add('is-active');
            const activeLi = activeLink.closest('li');
            if (activeLi) {
                activeLi.classList.add('is-active');
            }

            // Markeer alle bovenliggende li's als has-active zodat geneste H4 lijsten openen
            let parent = activeLi ? activeLi.parentElement : null;
            while (parent && parent !== toc) {
                if (parent.tagName === 'LI') {
                    parent.classList.add('has-active');
                }
                parent = parent.parentElement;
            }

            // Scroll het TOC menu mee indien het actieve item buiten de viewport van nav valt
            const nav = toc;
            const navRect = nav.getBoundingClientRect();
            const linkRect = activeLink.getBoundingClientRect();
            if (linkRect.top < navRect.top || linkRect.bottom > navRect.bottom) {
                activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        }
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveToc();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    window.addEventListener('resize', updateActiveToc, { passive: true });
    window.addEventListener('hashchange', () => {
        setTimeout(updateActiveToc, 50);
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateActiveToc);
    } else {
        updateActiveToc();
    }
})();

