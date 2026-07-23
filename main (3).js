// Artur Landing Page - main.js
// Dedicated scripts for interactive elements, calculator, end-to-end multi-system simulation and Netlify form integrations.

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const modal = document.getElementById('booking-modal');
    const leadForm = document.getElementById('lead-form');
    const successBox = document.getElementById('success-box');
    const planAlert = document.getElementById('plan-alert');
    const selectedPlanName = document.getElementById('selected-plan-name');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');

    // CONFIGURACIÓN DE TU AGENDA (Enlace oficial de agendamiento proporcionado por el usuario)
    const GOOGLE_CALENDAR_URL = "https://calendar.app.google/oJ6JFH8rs4WwKM9g8";

    // Calculator Inputs
    const facturasInput = document.getElementById('facturas-input');
    const tiempoInput = document.getElementById('tiempo-input');
    const facturasVal = document.getElementById('facturas-val');
    const tiempoVal = document.getElementById('tiempo-val');
    const resultTiempo = document.getElementById('result-tiempo');
    const resultDinero = document.getElementById('result-dinero');

    // Global State variables
    let activePlanSelected = "Diagnóstico General (Sin Plan específico)";
    let isGrandSimulating = false;

    // Mobile Menu Toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close Mobile Menu on Link Click
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Action when Clicking "Ver demo (Artur en acción)" in Hero
    window.scrollToDemoAndRun = function() {
        const demoSection = document.getElementById('live-demo-seccion');
        if (demoSection) {
            demoSection.scrollIntoView({ behavior: 'smooth' });
            // Briefly wait for smooth scroll to finish, then execute the main simulation automatically
            setTimeout(() => {
                window.runGrandSimulation();
            }, 800);
        }
    };

    // Grand interactive end-to-end multi-system simulation (15 Seconds walkthrough)
    window.runGrandSimulation = async function() {
        if (isGrandSimulating) return;
        isGrandSimulating = true;

        const btn = document.getElementById('master-sim-btn');
        const icon = document.getElementById('master-sim-icon');
        const text = document.getElementById('master-sim-text');

        if (!btn || !icon || !text) {
            isGrandSimulating = false;
            return;
        }

        // Set button to active processing state
        btn.disabled = true;
        btn.className = "bg-slate-700 text-slate-400 text-sm font-bold py-4 px-10 rounded-full shadow cursor-not-allowed flex items-center space-x-3";
        icon.className = "fa-solid fa-spinner animate-spin text-google-blue";
        text.textContent = "Procesando simulación en vivo...";

        // Panels DOM elements
        const p1 = document.getElementById('panel-gmail');
        const p2 = document.getElementById('panel-gemini');
        const p3 = document.getElementById('panel-sheets');
        const p4 = document.getElementById('panel-drive');

        const bgmail = document.getElementById('badge-gmail');
        const bgemini = document.getElementById('badge-gemini');
        const bsheets = document.getElementById('badge-sheets');
        const bdrive = document.getElementById('badge-drive');

        // Text/Status placeholders
        const sgmail = document.getElementById('status-gmail');
        const sgemini = document.getElementById('status-gemini');
        const ssheets = document.getElementById('status-sheets');
        const sdrive = document.getElementById('status-drive');

        // 1. Gmail Elements
        const emailArriving = document.getElementById('email-arriving');
        const emailSender = document.getElementById('email-sender');
        const emailSubject = document.getElementById('email-subject');
        const emailStatusIcon = document.getElementById('email-status-icon');

        // 2. Gemini Elements
        const valEmisor = document.getElementById('val-emisor');
        const valRfc = document.getElementById('val-rfc');
        const valSubtotal = document.getElementById('val-subtotal');
        const valIva = document.getElementById('val-iva');
        const valTotal = document.getElementById('val-total');

        const boxEmisor = document.getElementById('box-emisor');
        const boxRfc = document.getElementById('box-rfc');
        const boxSubtotal = document.getElementById('box-subtotal');
        const boxIva = document.getElementById('box-iva');
        const boxTotal = document.getElementById('box-total');

        // 3. Sheets Elements
        const cellProvider = document.getElementById('cell-provider');
        const cellTotal = document.getElementById('cell-total');
        const cellStatus = document.getElementById('cell-status');
        const sheetTypingRow = document.getElementById('sheet-typing-row');

        // 4. Drive Elements
        const folderNameVal = document.getElementById('folder-name-val');
        const driveFileCard = document.getElementById('drive-file-card');
        const driveFileName = document.getElementById('drive-file-name');
        const fileCheckIcon = document.getElementById('file-check-icon');

        // Reset All Panels to initial State before starting
        [p1, p2, p3, p4].forEach(p => {
            if (p) p.className = "bg-slate-800/60 border border-slate-700/60 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 opacity-40";
        });
        [bgmail, bgemini, bsheets, bdrive].forEach(b => {
            if (b) {
                b.textContent = "Inactivo";
                b.className = "text-[9px] bg-slate-700 text-slate-400 font-bold px-2 py-0.5 rounded-full";
            }
        });

        // Reset visual placeholders
        if (emailArriving) emailArriving.className = "p-2.5 bg-slate-900/20 border border-dashed border-slate-700 rounded-xl flex items-center justify-between transition-all duration-500";
        if (emailSender) {
            emailSender.textContent = "Bandeja Vacía";
            emailSender.className = "font-bold text-gray-400";
        }
        if (emailSubject) emailSubject.textContent = "Esperando correo...";
        if (emailStatusIcon) {
            emailStatusIcon.className = "text-xs text-gray-600 shrink-0";
            emailStatusIcon.innerHTML = '<i class="fa-solid fa-ellipsis"></i>';
        }

        [valEmisor, valRfc, valSubtotal, valIva, valTotal].forEach(el => { 
            if (el) {
                el.textContent = "---"; 
                el.className = "font-semibold text-gray-500"; 
            }
        });
        [boxEmisor, boxRfc, boxSubtotal, boxIva, boxTotal].forEach(el => {
            if (el) el.className = "p-1 rounded transition-colors duration-300";
        });

        if (sheetTypingRow) sheetTypingRow.className = "opacity-25 border-dashed border-slate-800 transition-all duration-300";
        if (cellProvider) cellProvider.textContent = "---";
        if (cellTotal) cellTotal.textContent = "---";
        if (cellStatus) cellStatus.innerHTML = '<i class="fa-solid fa-circle-notch animate-spin"></i>';

        if (folderNameVal) {
            folderNameVal.textContent = "Esperando mes...";
            folderNameVal.className = "text-[9px] text-gray-500";
        }
        if (driveFileCard) driveFileCard.className = "flex items-center space-x-3 bg-slate-800/20 border border-dashed border-slate-700/50 py-2 px-3 rounded-xl w-full opacity-30 transition-all duration-500";
        if (driveFileName) driveFileName.textContent = "factura_original.pdf";
        if (fileCheckIcon) fileCheckIcon.innerHTML = '<i class="fa-solid fa-ellipsis"></i>';

        if (sgmail) sgmail.textContent = "Escaneando bandeja de entrada...";
        if (sgemini) sgemini.textContent = "Esperando archivo PDF...";
        if (ssheets) ssheets.textContent = "Esperando extracción...";
        if (sdrive) sdrive.textContent = "Esperando clasificación...";

        await new Promise(r => setTimeout(r, 1000));

        // ==========================================
        // STAGE 1: Gmail Inbox (RED)
        // ==========================================
        if (p1) p1.className = "bg-slate-800 border-2 border-google-red/80 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 active-glow-red processing-pulse";
        if (bgmail) {
            bgmail.textContent = "Bot Escaneando";
            bgmail.className = "text-[9px] bg-google-red text-white font-bold px-2 py-0.5 rounded-full";
        }
        if (sgmail) sgmail.innerHTML = '<i class="fa-solid fa-magnifying-glass animate-pulse text-google-red mr-1.5"></i> Buscando nuevas facturas...';

        await new Promise(r => setTimeout(r, 1500));

        // New Email Arrives
        if (emailArriving) emailArriving.className = "p-2.5 bg-red-950/30 border border-google-red rounded-xl flex items-center justify-between transition-all duration-500 scale-[1.03] shadow-lg shadow-red-500/10";
        if (emailSender) {
            emailSender.textContent = "Oficinas y Papelería del Norte";
            emailSender.className = "font-extrabold text-white";
        }
        if (emailSubject) emailSubject.textContent = "Fwd: Factura Adjunta F-2342 / PDF & XML";
        if (emailStatusIcon) {
            emailStatusIcon.className = "text-google-red animate-pulse shrink-0 text-sm";
            emailStatusIcon.innerHTML = '<i class="fa-solid fa-bell"></i>';
        }
        if (sgmail) sgmail.innerHTML = '<span class="text-google-red font-bold"><i class="fa-solid fa-circle-check"></i> Encontrada!</span> Iniciando lectura.';

        await new Promise(r => setTimeout(r, 2000));

        // Turn off Gmail pulsing, keep highlight state
        if (p1) p1.className = "bg-slate-800/80 border border-google-red/40 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 opacity-90";
        if (bgmail) {
            bgmail.textContent = "Esperando";
            bgmail.className = "text-[9px] bg-slate-700 text-slate-300 font-bold px-2 py-0.5 rounded-full";
        }
        if (emailStatusIcon) {
            emailStatusIcon.className = "text-google-green shrink-0 text-xs";
            emailStatusIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        }

        // ==========================================
        // STAGE 2: Gemini IA Extraction (YELLOW)
        // ==========================================
        if (p2) p2.className = "bg-slate-800 border-2 border-google-yellow/80 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 active-glow-yellow processing-pulse";
        if (bgemini) {
            bgemini.textContent = "Gemini Leyendo";
            bgemini.className = "text-[9px] bg-google-yellow text-slate-950 font-bold px-2 py-0.5 rounded-full";
        }
        if (sgemini) sgemini.innerHTML = '<i class="fa-solid fa-brain animate-pulse text-google-yellow mr-1.5"></i> Extrayendo datos fiscales...';

        await new Promise(r => setTimeout(r, 1200));

        // Extract Provider
        if (boxEmisor) boxEmisor.className = "p-1 rounded bg-yellow-500/10 border border-google-yellow/40";
        if (valEmisor) {
            valEmisor.textContent = "Oficinas y Papelería del Norte";
            valEmisor.className = "font-extrabold text-google-yellow animate-pulse";
        }
        if (sgemini) sgemini.textContent = "Detectado emisor...";

        await new Promise(r => setTimeout(r, 1000));

        // Extract RFC
        if (boxRfc) boxRfc.className = "p-1 rounded bg-yellow-500/10 border border-google-yellow/40";
        if (valRfc) {
            valRfc.textContent = "OPN151120K92";
            valRfc.className = "font-mono font-bold text-google-yellow animate-pulse";
        }
        if (sgemini) sgemini.textContent = "Validando RFC ante SAT...";

        await new Promise(r => setTimeout(r, 1000));

        // Extract totals
        [boxSubtotal, boxIva, boxTotal].forEach(el => {
            if (el) el.className = "p-1 rounded bg-yellow-500/10 border border-google-yellow/40";
        });
        if (valSubtotal) {
            valSubtotal.textContent = "$3,420.00";
            valSubtotal.className = "font-bold text-google-yellow";
        }
        if (valIva) {
            valIva.textContent = "$547.20";
            valIva.className = "font-bold text-google-yellow";
        }
        if (valTotal) {
            valTotal.textContent = "$3,967.20";
            valTotal.className = "font-black text-google-yellow animate-pulse";
        }
        if (sgemini) sgemini.innerHTML = '<span class="text-google-yellow font-bold"><i class="fa-solid fa-circle-check"></i> Extracción Exitosa!</span>';

        await new Promise(r => setTimeout(r, 2000));

        // Turn off Gemini pulsing, keep static highlight
        if (p2) p2.className = "bg-slate-800/80 border border-google-yellow/40 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 opacity-90";
        if (bgemini) {
            bgemini.textContent = "Finalizado";
            bgemini.className = "text-[9px] bg-slate-700 text-slate-300 font-bold px-2 py-0.5 rounded-full";
        }

        // ==========================================
        // STAGE 3: Google Sheets Ledger Write (GREEN)
        // ==========================================
        if (p3) p3.className = "bg-slate-800 border-2 border-google-green/80 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 active-glow-green processing-pulse";
        if (bsheets) {
            bsheets.textContent = "Escribiendo";
            bsheets.className = "text-[9px] bg-google-green text-white font-bold px-2 py-0.5 rounded-full";
        }
        if (ssheets) ssheets.innerHTML = '<i class="fa-solid fa-keyboard animate-pulse text-google-green mr-1.5"></i> Insertando nueva fila...';

        await new Promise(r => setTimeout(r, 1000));

        // Type Row effect
        if (sheetTypingRow) sheetTypingRow.className = "bg-emerald-950/20 text-google-green font-semibold transition-all duration-500 animate-pulse border-y border-google-green/30";
        
        // Simulating typing letter by letter for Provider
        const fullProvName = "Oficinas y Papelería del Norte";
        if (cellProvider) cellProvider.textContent = "";
        let charsTyped = 0;
        const typingInterval = setInterval(() => {
            if (cellProvider) {
                if (charsTyped < fullProvName.length) {
                    cellProvider.textContent += fullProvName.charAt(charsTyped);
                    charsTyped++;
                } else {
                    clearInterval(typingInterval);
                }
            } else {
                clearInterval(typingInterval);
            }
        }, 30);

        await new Promise(r => setTimeout(r, 1000));
        if (cellTotal) cellTotal.textContent = "$3,967.20";
        if (cellStatus) {
            cellStatus.className = "text-google-green text-[9px] animate-bounce shrink-0";
            cellStatus.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i>';
        }
        if (ssheets) ssheets.innerHTML = '<span class="text-google-green font-bold"><i class="fa-solid fa-circle-check"></i> Registro Guardado!</span>';

        await new Promise(r => setTimeout(r, 1500));

        // Keep Sheets stable but glowing green
        if (p3) p3.className = "bg-slate-800/80 border border-google-green/40 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 opacity-90";
        if (bsheets) {
            bsheets.textContent = "Sincronizado";
            bsheets.className = "text-[9px] bg-slate-700 text-slate-300 font-bold px-2 py-0.5 rounded-full";
        }

        // ==========================================
        // STAGE 4: Google Drive Folder Structure & Renaming (BLUE)
        // ==========================================
        if (p4) p4.className = "bg-slate-800 border-2 border-google-blue/80 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 active-glow-blue processing-pulse";
        if (bdrive) {
            bdrive.textContent = "Clasificando";
            bdrive.className = "text-[9px] bg-google-blue text-white font-bold px-2 py-0.5 rounded-full";
        }
        if (sdrive) sdrive.innerHTML = '<i class="fa-solid fa-folder-plus animate-pulse text-google-blue mr-1.5"></i> Verificando estructura...';

        await new Promise(r => setTimeout(r, 1200));

        // Locate / create monthly folder
        if (folderNameVal) {
            folderNameVal.textContent = "2026-07";
            folderNameVal.className = "font-black text-google-blue text-[11px] animate-pulse";
        }
        if (sdrive) sdrive.textContent = "Carpeta '2026-07' lista. Renombrando archivo...";

        await new Promise(r => setTimeout(r, 1000));

        // Bring File card to full view and show dynamic renaming
        if (driveFileCard) driveFileCard.className = "flex items-center space-x-3 bg-blue-950/20 border border-google-blue rounded-xl w-full transition-all duration-500 scale-[1.03] shadow-lg shadow-blue-500/10";
        
        // Renaming effect animation
        let renameStage = 1;
        const renamingAnimation = setInterval(() => {
            if (driveFileName) {
                if (renameStage === 1) {
                    driveFileName.textContent = "Factura_Papeleria_Norte_F2342...";
                    renameStage++;
                } else if (renameStage === 2) {
                    driveFileName.textContent = "OficinasPapeleria_F-2342_2026-07...";
                    renameStage++;
                } else {
                    driveFileName.textContent = "OficinasPapeleria_F-2342_2026-07.pdf";
                    clearInterval(renamingAnimation);
                }
            } else {
                clearInterval(renamingAnimation);
            }
        }, 600);

        await new Promise(r => setTimeout(r, 2000));
        if (fileCheckIcon) {
            fileCheckIcon.className = "text-google-blue text-xs animate-bounce shrink-0";
            fileCheckIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        }
        if (sdrive) sdrive.innerHTML = '<span class="text-google-blue font-bold"><i class="fa-solid fa-circle-check"></i> Archivo Organizado!</span>';

        await new Promise(r => setTimeout(r, 1500));

        // All systems green / complete!
        [p1, p2, p3, p4].forEach(p => {
            if (p) p.className = "bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 shadow-premium";
        });
        [bgmail, bgemini, bsheets, bdrive].forEach(b => {
            if (b) {
                b.textContent = "100% OK";
                b.className = "text-[9px] bg-google-green text-white font-bold px-2 py-0.5 rounded-full";
            }
        });

        // Master restore button
        btn.disabled = false;
        btn.className = "bg-gradient-to-r from-google-blue via-google-green to-google-yellow hover:scale-105 active:scale-95 text-slate-950 text-sm font-black py-4 px-10 rounded-full shadow-lg transition-all duration-150 flex items-center space-x-3";
        if (icon) icon.className = "fa-solid fa-rotate-left text-slate-950";
        if (text) text.textContent = "Iniciar Simulación (15 segs)";
        isGrandSimulating = false;
    };

    // ROI Calculator Logic
    function updateCalculator() {
        if (!facturasInput || !tiempoInput) return;
        const facturas = parseInt(facturasInput.value);
        const tiempo = parseInt(tiempoInput.value);

        // Update UI Value Labels
        if (facturasVal) facturasVal.textContent = facturas.toLocaleString();
        if (tiempoVal) tiempoVal.textContent = `${tiempo} min`;

        // Core Logic Calculations
        const totalMinutosMes = facturas * tiempo;
        const totalHorasMes = totalMinutosMes / 60;
        
        // Standard hourly rate estimated cost for manual data keying in MXN
        const costoPorHora = 150; 
        const dineroAhorradoAnual = totalHorasMes * costoPorHora * 12;

        // Render Results
        if (resultTiempo) resultTiempo.textContent = `${totalHorasMes.toFixed(1)} hrs`;
        if (resultDinero) resultDinero.textContent = `$${Math.round(dineroAhorradoAnual).toLocaleString()} MXN`;
    }

    if (facturasInput && tiempoInput) {
        facturasInput.addEventListener('input', updateCalculator);
        tiempoInput.addEventListener('input', updateCalculator);
        // Run once on load
        updateCalculator();
    }

    // Modal Controls
    window.openModal = function(planName = null) {
        if (!modal) return;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        if (planName && planAlert && selectedPlanName) {
            planAlert.classList.remove('hidden');
            selectedPlanName.textContent = planName;
            activePlanSelected = planName;
        } else if (planAlert) {
            planAlert.classList.add('hidden');
            activePlanSelected = "Diagnóstico General (Sin Plan específico)";
        }

        // Reset Modal Panel size to default
        const modalPanel = document.getElementById('modal-panel');
        if (modalPanel) {
            modalPanel.classList.remove('sm:max-w-3xl');
            modalPanel.classList.add('sm:max-w-lg');
        }

        // Reset form/success view inside modal
        if (leadForm) leadForm.classList.remove('hidden');
        if (successBox) successBox.classList.add('hidden');
        
        // Enable submit button
        if (submitBtn && btnText) {
            submitBtn.disabled = false;
            btnText.textContent = "Confirmar e Ir al Calendario";
        }
    };

    window.closeModal = function() {
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    };

    // FAQ Toggle Logic
    window.toggleFaq = function(button) {
        const content = button.nextElementSibling;
        const icon = button.querySelector('i');
        
        if (content && icon) {
            content.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
        }
    };

    // Lead Form Submit handler - Integrates securely with Netlify Forms AJAX & Redirects to Google Calendar
    window.submitForm = async function(event) {
        if (event) event.preventDefault();

        // Disable button during submission
        if (submitBtn && btnText) {
            submitBtn.disabled = true;
            btnText.textContent = "Guardando...";
        }

        // Gather form fields for submission
        const formData = new FormData(leadForm);
        formData.append('plan', activePlanSelected);

        try {
            // Netlify Form AJAX post
            await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            });
        } catch (error) {
            console.error("Hubo un error guardando el registro en Netlify Forms:", error);
            // Even if offline or error, we proceed so the user is not blocked from booking
        }

        // Update modal presentation to Success
        if (leadForm) leadForm.classList.add('hidden');
        if (successBox) successBox.classList.remove('hidden');

        // Dynamically set the href for the fallback button
        const directBtn = document.getElementById('direct-calendar-btn');
        if (directBtn) {
            directBtn.href = GOOGLE_CALENDAR_URL;
        }

        // Automatically open the official appointment schedule in a new tab after 2 seconds
        setTimeout(() => {
            window.open(GOOGLE_CALENDAR_URL, '_blank');
        }, 2000);
    };

    // Window Scroll Active Nav Class for Premium look
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('shadow-md');
            } else {
                header.classList.remove('shadow-md');
            }
        }
    });
});
