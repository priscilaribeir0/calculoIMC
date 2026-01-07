document.addEventListener('DOMContentLoaded', function() {
    // Calculadora rápida na página inicial
    const quickWeight = document.getElementById('quick-weight');
    const quickHeight = document.getElementById('quick-height');
    const quickCalculateBtn = document.getElementById('quick-calculate');
    const quickResult = document.getElementById('quick-result');
    
    if (quickCalculateBtn) {
        quickCalculateBtn.addEventListener('click', function() {
            const weight = parseFloat(quickWeight.value);
            const height = parseFloat(quickHeight.value);
            
            if (!weight || !height || weight <= 0 || height <= 0) {
                showQuickResult('Por favor, insira valores válidos para peso e altura.', 'error');
                return;
            }
            
            const imc = weight / (height * height);
            
            // Determinar classificação
            let classification = '';
            let color = '#3498db';
            
            if (imc < 18.5) {
                classification = 'Abaixo do peso';
                color = '#3498db';
            } else if (imc < 25) {
                classification = 'Peso normal';
                color = '#2ecc71';
            } else if (imc < 30) {
                classification = 'Sobrepeso';
                color = '#f1c40f';
            } else if (imc < 35) {
                classification = 'Obesidade Grau I';
                color = '#e67e22';
            } else if (imc < 40) {
                classification = 'Obesidade Grau II';
                color = '#e74c3c';
            } else {
                classification = 'Obesidade Grau III';
                color = '#c0392b';
            }
            
            const resultHTML = `
                <h3>Resultado do IMC</h3>
                <div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin: 15px 0;">
                    <div style="font-size: 2.5rem; font-weight: bold; color: ${color};">${imc.toFixed(1)}</div>
                    <div style="background-color: ${color}; color: white; padding: 8px 16px; border-radius: 20px;">
                        ${classification}
                    </div>
                </div>
                <p>Seu Índice de Massa Corporal é <strong>${imc.toFixed(2)} kg/m²</strong>.</p>
                <a href="calculadora.html" style="display: inline-block; margin-top: 10px; color: #3498db; text-decoration: none;">
                    <i class="fas fa-calculator"></i> Calcular com mais detalhes
                </a>
            `;
            
            showQuickResult(resultHTML, 'success');
        });
    }
    
    function showQuickResult(message, type) {
        quickResult.innerHTML = message;
        quickResult.classList.add('active');
        
        if (type === 'error') {
            quickResult.style.borderLeft = '4px solid #e74c3c';
        } else {
            quickResult.style.borderLeft = '4px solid #2ecc71';
        }
        
        // Rolagem suave para o resultado
        quickResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Navegação ativa
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Animação suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Exemplo para calculadora rápida
    if (quickWeight && quickHeight) {
        quickWeight.value = '68';
        quickHeight.value = '1.72';
    }
});