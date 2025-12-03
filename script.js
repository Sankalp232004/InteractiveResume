document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('resume-container');
    const scrollIndicator = document.querySelector('#scroll-indicator span');
    const printBtn = document.getElementById('print-btn');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    function buildHero(data) {
        const tags = data.hero.tags.map(tag => `<span class="hero-tag">${tag}</span>`).join('');
        const spotlight = data.hero.spotlight.map(line => `<li>${line}</li>`).join('');
        const metrics = data.metrics.map(metric => `
            <article class="metric-card">
                <div class="metric-value">${metric.value}</div>
                <div class="metric-label">${metric.label}</div>
                <p class="metric-detail">${metric.detail}</p>
            </article>
        `).join('');
        return `
            <section class="hero-card reveal">
                <div class="hero-header">
                    <p class="hero-role">${data.hero.role}</p>
                    <h1>${data.hero.name}</h1>
                    <p class="hero-headline">${data.hero.headline}</p>
                    <p class="hero-pitch typewriter" id="hero-pitch"></p>
                    <div class="hero-tags">${tags}</div>
                </div>
                <div class="hero-contact">
                    <div class="contact-line"><i class="fa-solid fa-location-dot"></i><span>${data.hero.location}</span></div>
                    <div class="contact-line"><i class="fa-solid fa-envelope"></i><a href="mailto:${data.hero.email}">${data.hero.email}</a></div>
                    <div class="contact-line"><i class="fa-brands fa-linkedin"></i><a href="https://${data.hero.linkedin}" target="_blank" rel="noreferrer">${data.hero.linkedin}</a></div>
                    <div class="contact-line"><i class="fa-brands fa-github"></i><a href="https://${data.hero.github}" target="_blank" rel="noreferrer">${data.hero.github}</a></div>
                    <div class="hero-availability">${data.hero.availability}</div>
                    <ul class="spotlight-list">${spotlight}</ul>
                </div>
            </section>
            <section class="metrics-grid reveal">${metrics}</section>
        `;
    }

    function buildFocus(focusAreas) {
        return `
            <section class="reveal">
                <p class="section-title">Focus Areas</p>
                <div class="focus-grid">
                    ${focusAreas.map((area, index) => `
                        <article class="focus-card${index === 0 ? ' active' : ''}" data-focus-index="${index}">
                            <h3>${area.title}</h3>
                            <p>${area.statement}</p>
                            <div class="focus-keywords">
                                ${area.keywords.map(keyword => `<span class="keyword-pill">${keyword}</span>`).join('')}
                            </div>
                        </article>
                    `).join('')}
                </div>
            </section>
        `;
    }

    function buildExperiencePanel(experience) {
        return experience.map(role => {
            const narrative = [...role.impact, ...role.outcomes];
            return `
                <article class="timeline-card">
                    <h3>${role.title}</h3>
                    <div class="timeline-meta">
                        <span>${role.company}</span>
                        <span>${role.location}</span>
                        <span>${role.period}</span>
                    </div>
                    <ul class="impact-list">
                        ${narrative.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                    <div class="chip-row">
                        ${role.tools.map(tool => `<span class="chip">${tool}</span>`).join('')}
                    </div>
                </article>
            `;
        }).join('');
    }

    function buildProjectsPanel(projects) {
        return projects.map(project => `
            <article class="project-card">
                <h3>${project.title}</h3>
                <p>${project.summary}</p>
                <ul class="highlight-list">
                    ${project.highlights.map(item => `<li>${item}</li>`).join('')}
                </ul>
                <div class="chip-row">
                    ${project.stack.map(tool => `<span class="chip">${tool}</span>`).join('')}
                </div>
            </article>
        `).join('');
    }

    function buildSkillsPanel(skills) {
        return skills.map(group => `
            <article class="skill-card">
                <h3>${group.group}</h3>
                <div class="skill-pills">
                    ${group.items.map(skill => `<span class="pill">${skill}</span>`).join('')}
                </div>
            </article>
        `).join('');
    }

    function buildTabs(data) {
        const tabs = [
            { id: 'experience', label: 'Experience', className: 'timeline-panel', content: buildExperiencePanel(data.experience) },
            { id: 'projects', label: 'Projects', className: 'projects-panel', content: buildProjectsPanel(data.projects) },
            { id: 'skills', label: 'Skills', className: 'skills-panel', content: buildSkillsPanel(data.skills) }
        ];
        const buttons = tabs.map((tab, index) => `
            <button class="tab-button${index === 0 ? ' active' : ''}" data-tab="${tab.id}">${tab.label}</button>
        `).join('');
        const panels = tabs.map((tab, index) => `
            <div class="tab-panel ${tab.className}${index === 0 ? ' active' : ''}" data-panel="${tab.id}">
                ${tab.content}
            </div>
        `).join('');
        return `
            <section class="tabs-shell reveal">
                <p class="section-title">Career Narrative</p>
                <div class="tab-buttons">${buttons}</div>
                <div class="tab-panels">${panels}</div>
            </section>
        `;
    }

    function buildRecognition(data) {
        const education = data.education;
        const educationHighlights = education.highlights.map(item => `<li>${item}</li>`).join('');
        const coursework = education.coursework.map(item => `<span class="pill">${item}</span>`).join('');
        const awards = data.awards.map(item => `<li>${item}</li>`).join('');
        return `
            <section class="reveal">
                <p class="section-title">Recognition & Academics</p>
                <div class="dual-grid">
                    <article class="education-card">
                        <h3>${education.institution}</h3>
                        <p>${education.location}</p>
                        <p><strong>${education.program}</strong></p>
                        <p>${education.period}</p>
                        <ul class="highlight-list">${educationHighlights}</ul>
                        <div class="course-pills">${coursework}</div>
                    </article>
                    <article class="awards-card">
                        <h3>Honors & Awards</h3>
                        <ul>${awards}</ul>
                    </article>
                </div>
            </section>
        `;
    }

    function buildCTA(hero) {
        return `
            <section class="cta-card reveal">
                <div>
                    <h2>Ready to deliver data-backed strategy</h2>
                    <p>Let's explore consulting, strategy, or research challenges where ${hero.name.split(' ')[0]} can pair quantitative rigor with business judgment.</p>
                </div>
                <div class="cta-actions">
                    <button id="cta-connect" class="cta-primary">Email Sankalp</button>
                    <button id="cta-save" class="cta-secondary">Save as PDF</button>
                </div>
            </section>
        `;
    }

    function buildResume(data) {
        container.innerHTML = `
            <div class="resume-inner">
                ${buildHero(data)}
                ${buildFocus(data.focusAreas)}
                ${buildTabs(data)}
                ${buildRecognition(data)}
                ${buildCTA(data.hero)}
            </div>
        `;
    }

    function runTypewriter(targetId, text) {
        const node = document.getElementById(targetId);
        if (!node) {
            return;
        }
        node.textContent = '';
        let idx = 0;
        function loop() {
            if (idx < text.length) {
                node.innerHTML += text.charAt(idx);
                idx += 1;
                setTimeout(loop, 20);
            }
        }
        loop();
    }

    function initTabs() {
        const buttons = document.querySelectorAll('.tab-button');
        const panels = document.querySelectorAll('.tab-panel');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const target = button.getAttribute('data-tab');
                buttons.forEach(btn => btn.classList.toggle('active', btn === button));
                panels.forEach(panel => {
                    panel.classList.toggle('active', panel.getAttribute('data-panel') === target);
                });
            });
        });
    }

    function initFocusCards() {
        const cards = document.querySelectorAll('.focus-card');
        if (!cards.length) {
            return;
        }
        let activeIndex = 0;
        cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                activeIndex = index;
                cards.forEach((node, idx) => node.classList.toggle('active', idx === activeIndex));
            });
        });
        setInterval(() => {
            activeIndex = (activeIndex + 1) % cards.length;
            cards.forEach((node, idx) => node.classList.toggle('active', idx === activeIndex));
        }, 6000);
    }

    function initRevealObserver() {
        const revealables = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        revealables.forEach(section => observer.observe(section));
    }

    function updateScrollIndicator() {
        if (!scrollIndicator) {
            return;
        }
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollIndicator.style.width = `${progress}%`;
    }

    function syncThemeOnLoad() {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
        }
    }

    buildResume(resumeData);
    runTypewriter('hero-pitch', resumeData.hero.pitch);
    initTabs();
    initFocusCards();
    initRevealObserver();
    syncThemeOnLoad();
    updateScrollIndicator();

    document.addEventListener('scroll', updateScrollIndicator);

    printBtn.addEventListener('click', () => window.print());

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    document.addEventListener('click', event => {
        if (event.target.id === 'cta-connect') {
            const subject = encodeURIComponent('Opportunity for Sankalp Mishra');
            window.location.href = `mailto:${resumeData.hero.email}?subject=${subject}`;
        }
        if (event.target.id === 'cta-save') {
            window.print();
        }
    });
});
