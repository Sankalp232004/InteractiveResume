document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('resume-container');

    function buildResume(data) {
        let html = '';
        html += `
            <header class="resume-header">
                <h1>${data.header.name}</h1>
                <p class="contact-info">
                    ${data.header.location} |
                    <a href="mailto:${data.header.email}">${data.header.email}</a> |
                    <a href="https://${data.header.linkedin}" target="_blank">${data.header.linkedin}</a> |
                    <a href="https://${data.header.github}" target="_blank">${data.header.github}</a>
                </p>
            </header>
        `;
        html += '<main>';
        html += `
            <section class="summary hidden">
                <h2>Professional Summary</h2>
                <p id="summary-text"></p>
            </section>
        `;
        html += '<section class="experience hidden"><h2>Professional Experience</h2>';
        data.experience.forEach(job => {
            html += `
                <div class="entry">
                    <div class="entry-header">
                        <h3>${job.title}</h3>
                        <span>${job.period}</span>
                    </div>
                    <p class="sub-header">${job.company} | ${job.location}</p>
                    <ul>${job.details.map(detail => `<li>${detail}</li>`).join('')}</ul>
                </div>
            `;
        });
        html += '</section>';
        html += '<section class="education hidden"><h2>Education</h2>';
        data.education.forEach(edu => {
            html += `
                <div class="entry">
                    <h3>${edu.institution}</h3>
                    <p><strong>${edu.degree}</strong> (${edu.period})</p>
                    <ul>${edu.details.map(detail => `<li>${detail}</li>`).join('')}</ul>
                </div>
            `;
        });
        html += '</section>';
        html += '<section class="projects hidden"><h2>Projects</h2>';
        data.projects.forEach(project => {
            html += `
                <div class="entry">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                </div>
            `;
        });
        html += '</section>';
        
        html += '<section class="skills hidden"><h2>Technical Skills</h2>';
        data.skills.forEach(skillCategory => {
            html += `<p><strong>${skillCategory.category} |</strong> ${skillCategory.details}</p>`;
        });
        html += '</section>';
        
        html += '<section class="awards hidden"><h2>Honors & Awards</h2>';
        html += `<ul>${data.awards.map(award => `<li>${award}</li>`).join('')}</ul>`;
        html += '</section>';
        html += '</main>';
        container.innerHTML = html;
    }

    buildResume(resumeData);

    const summaryTextElement = document.getElementById('summary-text');
    const fullSummaryText = resumeData.summary;
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < fullSummaryText.length) {
            summaryTextElement.innerHTML += fullSummaryText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 20);
        } else {
            summaryTextElement.style.borderRight = 'none';
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('section.hidden').forEach(section => {
        observer.observe(section);
    });

    setTimeout(typeWriter, 500);

    const printBtn = document.getElementById('print-btn');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    printBtn.addEventListener('click', () => { window.print(); });

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
});
