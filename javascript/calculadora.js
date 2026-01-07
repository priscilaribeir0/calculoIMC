document.addEventListener('DOMContentLoaded', function () {
    // Elementos DOM
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const ageInput = document.getElementById('age');
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');
    const resultSection = document.getElementById('result-section');
    const imcValue = document.getElementById('imc-value');
    const imcLabel = document.getElementById('imc-label');
    const resultMessage = document.getElementById('result-message');
    const resultDetails = document.getElementById('result-details');

    // Classificações do IMC
    const classifications = [
        { min: 0, max: 18.5, name: "Abaixo do peso", color: "#3498db", message: "Seu IMC está abaixo do recomendado. Considere buscar orientação nutricional para ganho de peso saudável." },
        { min: 18.5, max: 25, name: "Peso normal", color: "#2ecc71", message: "Parabéns! Seu IMC está dentro da faixa considerada saudável. Continue mantendo hábitos saudáveis." },
        { min: 25, max: 30, name: "Sobrepeso", color: "#f1c40f", message: "Seu IMC indica sobrepeso. Considere ajustes na alimentação e prática regular de exercícios físicos." },
        { min: 30, max: 35, name: "Obesidade Grau I", color: "#e67e22", message: "Seu IMC indica obesidade grau I. Recomenda-se acompanhamento médico e nutricional." },
        { min: 35, max: 40, name: "Obesidade Grau II", color: "#e74c3c", message: "Seu IMC indica obesidade grau II. É importante buscar orientação profissional para um plano de saúde adequado." },
        { min: 40, max: Infinity, name: "Obesidade Grau III", color: "#c0392b", message: "Seu IMC indica obesidade grau III. Recomenda-se acompanhamento médico especializado para cuidados de saúde." }
    ];

    // Função para calcular o IMC
    function calculateIMC() {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);
        const age = ageInput.value ? parseInt(ageInput.value) : null;

        // Validação
        if (!weight || !height || weight <= 0 || height <= 0) {
            showError("Por favor, insira valores válidos para peso e altura.");
            return;
        }

        if (weight > 300) {
            showError("O peso máximo permitido é 300 kg.");
            return;
        }

        if (height > 2.5) {
            showError("A altura máxima permitida é 2.5 metros.");
            return;
        }

        // Cálculo do IMC
        const imc = weight / (height * height);

        // Determinar classificação
        let classification = classifications[0];
        for (const cat of classifications) {
            if (imc >= cat.min && imc < cat.max) {
                classification = cat;
                break;
            }
        }

        // Atualizar a interface
        displayResult(imc, classification, age);

        // Rolagem suave para o resultado
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Função para exibir o resultado
    function displayResult(imc, classification, age) {
        // Atualizar valores
        imcValue.textContent = imc.toFixed(2);
        imcLabel.textContent = classification.name;
        imcLabel.style.backgroundColor = classification.color;

        // Atualizar mensagem
        resultMessage.innerHTML = `
            <p><strong>${classification.name}</strong></p>
            <p>${classification.message}</p>
        `;

        // Gerar detalhes
        let detailsHTML = `<h4><i class="fas fa-chart-bar"></i> Detalhes do Resultado</h4>`;
        detailsHTML += `<p><strong>Seu IMC:</strong> ${imc.toFixed(2)} kg/m²</p>`;
        detailsHTML += `<p><strong>Classificação:</strong> ${classification.name}</p>`;
        detailsHTML += `<p><strong>Faixa de IMC:</strong> ${classification.min.toFixed(1)} - ${classification.max === Infinity ? 'acima' : classification.max.toFixed(1)}</p>`;

        if (age) {
            detailsHTML += `<p><strong>Idade informada:</strong> ${age} anos</p>`;

            // Recomendação baseada na idade (exemplo simples)
            if (age < 18) {
                detailsHTML += `<p class="age-note"><i class="fas fa-exclamation-triangle"></i> Nota: O cálculo do IMC para crianças e adolescentes leva em consideração a idade e o sexo. Consulte um pediatra para avaliação adequada.</p>`;
            } else if (age >= 60) {
                detailsHTML += `<p class="age-note"><i class="fas fa-exclamation-triangle"></i> Nota: Para idosos, a composição corporal pode variar. Consulte um geriatra para avaliação mais precisa.</p>`;
            }
        }

        // Recomendações gerais
        detailsHTML += `
            <div class="recommendations">
                <h5><i class="fas fa-lightbulb"></i> Recomendações:</h5>
                <ul>
                    <li>Mantenha uma alimentação balanceada com frutas, verduras e legumes</li>
                    <li>Pratique atividades físicas regularmente (pelo menos 150 minutos por semana)</li>
                    <li>Beba bastante água durante o dia</li>
                    <li>Durma bem (7-8 horas por noite)</li>
                    <li>Consulte regularmente um médico para check-ups</li>
                </ul>
            </div>
        `;

        resultDetails.innerHTML = detailsHTML;

        // Mostrar a seção de resultado
        resultSection.style.display = 'block';
    }

    // Função para exibir erro
    function showError(message) {
        imcValue.textContent = "--";
        imcLabel.textContent = "Erro no cálculo";
        imcLabel.style.backgroundColor = "#e74c3c";

        resultMessage.innerHTML = `
            <p style="color: #e74c3c;"><strong><i class="fas fa-exclamation-triangle"></i> Atenção:</strong> ${message}</p>
        `;

        resultDetails.innerHTML = `
            <p>Por favor, corrija os dados informados e tente novamente.</p>
        `;

        resultSection.style.display = 'block';
    }

    // Função para resetar o formulário
    function resetForm() {
        weightInput.value = '';
        heightInput.value = '';
        ageInput.value = '';

        // Resetar seleção de gênero
        const genderRadios = document.querySelectorAll('input[name="gender"]');
        genderRadios.forEach(radio => radio.checked = false);

        // Resetar resultado
        imcValue.textContent = "--";
        imcLabel.textContent = "Preencha os dados";
        imcLabel.style.backgroundColor = "#95a5a6";
        resultMessage.innerHTML = `<p>Para ver seu resultado, preencha os dados de peso e altura e clique em "Calcular IMC".</p>`;
        resultDetails.innerHTML = "";

        // Focar no primeiro campo
        weightInput.focus();
    }

    // Função para validar entrada em tempo real
    function validateInput(input, min, max) {
        const value = parseFloat(input.value);

        if (input.value === '') return true;

        if (isNaN(value) || value < min || value > max) {
            input.style.borderColor = '#e74c3c';
            input.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
            return false;
        } else {
            input.style.borderColor = '#2ecc71';
            input.style.boxShadow = '0 0 0 3px rgba(46, 204, 113, 0.1)';
            return true;
        }
    }

    // Event Listeners
    calculateBtn.addEventListener('click', calculateIMC);
    resetBtn.addEventListener('click', resetForm);

    // Validar inputs em tempo real
    weightInput.addEventListener('input', function () {
        validateInput(this, 1, 300);
    });

    heightInput.addEventListener('input', function () {
        validateInput(this, 0.5, 2.5);
    });

    ageInput.addEventListener('input', function () {
        if (this.value !== '') {
            validateInput(this, 1, 120);
        } else {
            this.style.borderColor = '#e0e0e0';
            this.style.boxShadow = 'none';
        }
    });

    // Permitir calcular com Enter
    weightInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') calculateIMC();
    });

    heightInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') calculateIMC();
    });

    // Exemplo inicial para demonstração
    setTimeout(() => {
        weightInput.value = '75';
        heightInput.value = '1.78';
        validateInput(weightInput, 1, 300);
        validateInput(heightInput, 0.5, 2.5);
    }, 100);
});