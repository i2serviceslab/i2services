/* ==========================================================================
   I2 SERVICES S.A.S. — DROPBOX EXACT INTERACTION & SERVICESBOT INTELLIGENCE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ----------------------------------------------------------------------
       1. HEADER STICKY ELEVATION ON SCROLL
       ---------------------------------------------------------------------- */
    const header = document.getElementById('db-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    /* ----------------------------------------------------------------------
       2. EDITORIAL SCROLL COMPONENT (CAPACIDADES)
       ---------------------------------------------------------------------- */
    const contentBlocks = document.querySelectorAll('.content-block');
    const dynamicImg = document.getElementById('dynamic-img');

    if (contentBlocks.length && dynamicImg) {
        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -40% 0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    contentBlocks.forEach(b => b.classList.remove('is-active'));
                    entry.target.classList.add('is-active');

                    const newImg = entry.target.getAttribute('data-image');

                    if (newImg) {
                        dynamicImg.style.opacity = '0';
                        setTimeout(() => {
                            dynamicImg.src = newImg;
                            dynamicImg.style.opacity = '1';
                        }, 180);
                    }
                }
            });
        }, observerOptions);

        contentBlocks.forEach(block => observer.observe(block));
    }

    /* ----------------------------------------------------------------------
       3. HORIZONTAL CARDS SLIDER WITH TRANSPARENCY PREVIEW FOR COMMS CATALOG
       ---------------------------------------------------------------------- */
    const commsNavPills = document.querySelectorAll('.horiz-nav-pill');
    const commsSliderTrack = document.getElementById('comms-cards-track');
    const commsNavTrack = document.getElementById('comms-nav-track');
    const slideLeftBtn = document.getElementById('comms-slide-left');
    const slideRightBtn = document.getElementById('comms-slide-right');
    const commsCards = document.querySelectorAll('.comms-cards-slider-track .hybrid-detail-card');

    if (commsSliderTrack && commsCards.length) {
        
        // Helper: Activate Card by Index
        const scrollToCard = (index) => {
            const targetCard = document.getElementById(`comms-card-${index}`);
            if (targetCard) {
                targetCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        };

        // Tab Pill Click Events
        commsNavPills.forEach(pill => {
            pill.addEventListener('click', () => {
                const idx = parseInt(pill.getAttribute('data-index'), 10);
                if (!isNaN(idx)) {
                    scrollToCard(idx);
                }
            });
        });

        // Arrow Buttons Click Events
        if (slideLeftBtn) {
            slideLeftBtn.addEventListener('click', () => {
                commsSliderTrack.scrollBy({ left: -600, behavior: 'smooth' });
            });
        }
        if (slideRightBtn) {
            slideRightBtn.addEventListener('click', () => {
                commsSliderTrack.scrollBy({ left: 600, behavior: 'smooth' });
            });
        }

        // IntersectionObserver to Highlight Centered Active Card & Synced Tab Pill
        const sliderObserverOptions = {
            root: commsSliderTrack,
            threshold: 0.55
        };

        const sliderObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    commsCards.forEach(c => c.classList.remove('is-active'));
                    entry.target.classList.add('is-active');

                    const activeId = entry.target.id;
                    const indexStr = activeId.replace('comms-card-', '');

                    commsNavPills.forEach(pill => {
                        pill.classList.remove('is-active');
                        if (pill.getAttribute('data-index') === indexStr) {
                            pill.classList.add('is-active');

                            // Scroll active tab pill smoothly into center of top nav track
                            if (commsNavTrack) {
                                const pillLeft = pill.offsetLeft;
                                const pillWidth = pill.offsetWidth;
                                const trackWidth = commsNavTrack.offsetWidth;
                                commsNavTrack.scrollTo({
                                    left: pillLeft - (trackWidth / 2) + (pillWidth / 2),
                                    behavior: 'smooth'
                                });
                            }
                        }
                    });
                }
            });
        }, sliderObserverOptions);

        commsCards.forEach(card => sliderObserver.observe(card));
    }

    /* ----------------------------------------------------------------------
       4. LOGO TICKER PAUSE & PLAY TOGGLE
       ---------------------------------------------------------------------- */
    const pauseBtn = document.getElementById('pause-ticker-btn');
    const tickerTrack = document.getElementById('logo-ticker-track');
    const pauseIcon = document.getElementById('pause-icon');

    if (pauseBtn && tickerTrack && pauseIcon) {
        let isPaused = false;
        pauseBtn.addEventListener('click', () => {
            isPaused = !isPaused;
            if (isPaused) {
                tickerTrack.classList.add('paused');
                pauseIcon.className = 'fa-solid fa-circle-play';
            } else {
                tickerTrack.classList.remove('paused');
                pauseIcon.className = 'fa-solid fa-circle-pause';
            }
        });
    }

    /* ----------------------------------------------------------------------
       5. REAL-TIME MOUSE SPOTLIGHT BEAM FOR CONTACT SECTION
       ---------------------------------------------------------------------- */
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
        contactSection.addEventListener('mousemove', (e) => {
            const rect = contactSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            contactSection.style.setProperty('--mouse-x', `${x}px`);
            contactSection.style.setProperty('--mouse-y', `${y}px`);
        });
    }

    /* ----------------------------------------------------------------------
       1.B BILINGUAL EN | ES LANGUAGE TOGGLE SWITCHER (BRIEF RULE 0.8)
       ---------------------------------------------------------------------- */
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    const langBtnEn = document.getElementById('lang-btn-en');
    const langBtnEs = document.getElementById('lang-btn-es');
    let currentLang = 'en'; // Default per brief: "Inglés primero"

    const setLanguage = (lang) => {
        currentLang = lang;
        if (lang === 'en') {
            langBtnEn?.classList.add('active');
            langBtnEs?.classList.remove('active');
            document.documentElement.lang = 'en';
        } else {
            langBtnEs?.classList.add('active');
            langBtnEn?.classList.remove('active');
            document.documentElement.lang = 'es';
        }

        // Update text nodes
        const elements = document.querySelectorAll('[data-en][data-es]');
        elements.forEach(el => {
            const newText = el.getAttribute(`data-${lang}`);
            if (newText) {
                if (newText.includes('<') && newText.includes('>')) {
                    el.innerHTML = newText;
                } else {
                    el.textContent = newText;
                }
            }
        });

        // Update form input placeholders if provided
        const inputs = document.querySelectorAll('[data-placeholder-en][data-placeholder-es]');
        inputs.forEach(input => {
            const ph = input.getAttribute(`data-placeholder-${lang}`);
            if (ph) input.placeholder = ph;
        });
    };

    // Run setLanguage('en') on page load to guarantee English by default
    setLanguage('en');

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            setLanguage(currentLang === 'en' ? 'es' : 'en');
        });
    }

    /* ----------------------------------------------------------------------
       6. INTERACTIVE AI SERVICESBOT FLOATING ASSISTANT WIDGET
       ---------------------------------------------------------------------- */
    const botTrigger = document.getElementById('bot-trigger');
    const botWindow = document.getElementById('bot-window');
    const botCloseX = document.getElementById('bot-close-x');
    const botIconMain = document.getElementById('bot-icon-main');
    const botIconClose = document.getElementById('bot-icon-close');
    const botMessages = document.getElementById('bot-messages');
    const botInputForm = document.getElementById('bot-input-form');
    const botUserInput = document.getElementById('bot-user-input');
    const quickChips = document.querySelectorAll('.chip-btn');

    if (botTrigger && botWindow) {
        // Toggle Bot Window
        const toggleBot = () => {
            botWindow.classList.toggle('hidden');
            botIconMain.classList.toggle('hidden');
            botIconClose.classList.toggle('hidden');
        };

        botTrigger.addEventListener('click', toggleBot);
        if (botCloseX) botCloseX.addEventListener('click', toggleBot);

        // Helper: Add Message to Chat
        const addMessage = (text, sender = 'bot') => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `bot-msg ${sender}`;
            msgDiv.innerHTML = `<div class="msg-bubble">${text}</div>`;
            botMessages.appendChild(msgDiv);
            botMessages.scrollTop = botMessages.scrollHeight;
        };

        // Helper: Bot Typing Indicator Delay
        const botReply = (text, delay = 600) => {
            setTimeout(() => {
                addMessage(text, 'bot');
            }, delay);
        };

        // Chip Interactions
        quickChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const topic = chip.getAttribute('data-topic');
                const chipText = chip.textContent;

                addMessage(chipText, 'user');

                if (topic === 'agendar') {
                    if (currentLang === 'en') {
                        botReply(`📅 <strong>Direct Booking Process:</strong><br><br>We will gladly coordinate a free 48h strategic diagnostic session for your team.<br><br>Please enter your <strong>mining company name</strong> below:`);
                    } else {
                        botReply(`📅 <strong>Proceso de Agendamiento Directo:</strong><br><br>Con gusto le coordinaremos una sesión de diagnóstico estratégico sin costo de 48h.<br><br>Por favor indíquenos su <strong>compañía minera</strong> a continuación:`);
                    }
                    setTimeout(() => {
                        addMessage(`
                            <div style="background: #f0f7ff; padding: 12px; border-radius: 12px; border: 1px solid #29c5e6;">
                                <strong style="color:#1d68a6; display:block; margin-bottom:8px;">${currentLang === 'en' ? 'Book Direct Session:' : 'Agendar Cita Directa:'}</strong>
                                <input type="text" id="bot-schedule-company" placeholder="${currentLang === 'en' ? 'Company Name' : 'Nombre de su Compañía'}" style="width:100%; padding:8px; margin-bottom:8px; border-radius:6px; border:1px solid #ccc;">
                                <button id="btn-bot-confirm-schedule" style="background:#1d68a6; color:white; border:none; padding:8px 14px; border-radius:18px; font-weight:800; cursor:pointer; width:100%;">${currentLang === 'en' ? 'Confirm Session' : 'Confirmar Agendamiento'} <i class="fa-solid fa-check"></i></button>
                            </div>
                        `, 'bot');

                        document.getElementById('btn-bot-confirm-schedule')?.addEventListener('click', () => {
                            const comp = document.getElementById('bot-schedule-company')?.value || 'your company';
                            addMessage(`Confirm for ${comp}`, 'user');
                            if (currentLang === 'en') {
                                botReply(`✅ <strong>Session Requested Successfully!</strong><br><br>Priority request registered for <strong>${comp}</strong>. An executive director will reach out to your corporate email within 2 hours. Thank you for choosing i2 Services S.A.S.!`);
                            } else {
                                botReply(`✅ <strong>¡Cita Solicitada con Éxito!</strong><br><br>Hemos asignado una solicitud prioritaria para <strong>${comp}</strong>. Un director estratégico se comunicará a su correo corporativo en menos de 2 horas. ¡Gracias por confiar en i2 Services S.A.S.!`);
                            }
                        });
                    }, 800);
                } else if (topic === 'paquetes') {
                    if (currentLang === 'en') {
                        botReply(`💼 <strong>Monthly Retainer (Core Product):</strong><br><br>24/7 daily back-office operations: corporate legal, IFRS accounting, geology payroll, and ANM title standing with consolidated monthly board reporting (TSX/ASX).`);
                    } else {
                        botReply(`💼 <strong>Paquete Mensual (Producto Principal):</strong><br><br>Ofrece gestión operativa diaria 24/7 en administración, contabilidad IFRS configurada, nómina de geólogos y amparos ANM con reportes consolidados a su junta directiva (TSX/ASX).`);
                    }
                } else if (topic === 'anm') {
                    if (currentLang === 'en') {
                        botReply(`⚖️ <strong>ANM Mining Title Defense:</strong><br><br>We manage title standing, surface fee payments, PTO filings, and administrative defense before the National Mining Agency (ANM) with 100% compliance.`);
                    } else {
                        botReply(`⚖️ <strong>Defensa de Títulos ANM:</strong><br><br>Gestionamos la vigencia, pagos de canon superficiario, PTO y amparos administrativos ante la Agencia Nacional de Minería con 100% de cumplimiento.`);
                    }
                } else if (topic === 'ifrs') {
                    if (currentLang === 'en') {
                        botReply(`📊 <strong>IFRS / TSX / ASX Audits:</strong><br><br>Configured accounting systems fully aligned with international IFRS standards to pass tax and stock exchange audits seamlessly.`);
                    } else {
                        botReply(`📊 <strong>Auditorías IFRS / TSX / ASX:</strong><br><br>Contabilidad estructurada alineada a exigencias NIIF/IFRS internacionales para superar auditorías de bolsa sin observaciones.`);
                    }
                } else if (topic === 'contacto') {
                    if (currentLang === 'en') {
                        botReply(`📞 <strong>Direct Contact:</strong><br><br><strong>Office:</strong> Davivienda Business Tower, Suites 603-604, Cra. 43A #1 Sur 188, Medellín, Colombia.<br><strong>Phone:</strong> +57 310 397 6421<br><strong>Email:</strong> comunicaciones@i2services.co`);
                    } else {
                        botReply(`📞 <strong>Contacto Directo:</strong><br><br><strong>Oficina:</strong> Torre Empresarial Davivienda, Oficinas 603-604, Cra. 43A #1 Sur 188, Medellín.<br><strong>Línea Directa:</strong> +57 310 397 6421<br><strong>Email:</strong> comunicaciones@i2services.co`);
                    }
                }
            });
        });

        // User Custom Input Submit
        if (botInputForm && botUserInput) {
            botInputForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const query = botUserInput.value.trim();
                if (!query) return;

                addMessage(query, 'user');
                botUserInput.value = '';

                const qLower = query.toLowerCase();
                if (qLower.includes('agendar') || qLower.includes('book') || qLower.includes('cita') || qLower.includes('reunión') || qLower.includes('contact')) {
                    if (currentLang === 'en') {
                        botReply(`📅 We will gladly schedule a free 48h diagnostic session. Call us directly at <strong>+57 310 397 6421</strong> or email <strong>comunicaciones@i2services.co</strong>.`);
                    } else {
                        botReply(`📅 Con gusto le ayudamos a agendar su diagnóstico corporativo de 48h sin costo. Puede llamarnos directamente al <strong>+57 310 397 6421</strong> o enviarnos un correo a <strong>comunicaciones@i2services.co</strong>.`);
                    }
                } else if (qLower.includes('precio') || qLower.includes('cost') || qLower.includes('tarifa') || qLower.includes('price')) {
                    if (currentLang === 'en') {
                        botReply(`💡 We build tailored budgets at junior cost. The <strong>Initial Diagnostic (48h)</strong> is completely free.`);
                    } else {
                        botReply(`💡 Estructuramos presupuestos a la medida a costo de junior. El <strong>Diagnóstico Inicial (48h)</strong> es totalmente sin costo.`);
                    }
                } else if (qLower.includes('donde') || qLower.includes('where') || qLower.includes('address') || qLower.includes('ubicacion')) {
                    botReply(`🏢 Davivienda Business Tower, Suites 603-604, Cra. 43A #1 Sur 188, Medellín, Colombia.`);
                } else {
                    if (currentLang === 'en') {
                        botReply(`Thank you for your inquiry about "<em>${query}</em>". i2 Services S.A.S. provides legal, IFRS accounting, and corporate governance backing in Colombia. Would you like to schedule a private diagnostic?`);
                    } else {
                        botReply(`Gracias por su consulta sobre "<em>${query}</em>". i2 Services S.A.S. ofrece respaldo legal, contable IFRS y de relaciones corporativas en Colombia. ¿Desea agendar una sesión de diagnóstico privado?`);
                    }
                }
            });
        }
    }

});

