// URL base do WhatsApp (Substitua 55XX por seu número com DDD, o seu número original foi mantido)
const WHATSAPP_NUMBER = '5517988080207'; 

function setupWhatsappForm() {
    const form = document.getElementById('quote-form');

    // Remove qualquer listener anterior para evitar duplicidade
    if (form) {
        form.removeEventListener('submit', handleFormSubmit); 
        form.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // 1. Coleta os dados do Formulário
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const local = document.getElementById('local').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const idade = document.getElementById('idade').value;
    const quantidade = document.getElementById('quantidade').value;

    // 2. Coleta os itens do "Carrinho"
    const selectedServices = Array.from(document.querySelectorAll('input[name="servicos"]:checked'))
                                    .map(checkbox => checkbox.value)
                                    .join(' - '); // Usa traço para melhor visualização no texto
    
    const carrinhoText = selectedServices || 'Nenhum serviço específico. Gostaria de saber mais sobre todos os pacotes.';

    // 3. Cria a mensagem formatada para o WhatsApp
    const message = `
Olá, gostaria de um orçamento para a festa. 
*Serviços Selecionados:* ${carrinhoText}

*Detalhes do Evento:*
Nome: ${nome}
Telefone: ${telefone}
Local: ${local}
Data: ${data}
Hora: ${hora}
Faixa Etária: ${idade}
Qtd. Crianças: ${quantidade}

Aguardo o retorno com as opções!
`;

    // 4. Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(message.trim()); // trim remove espaços extras no início/fim

    // 5. Gera o link do WhatsApp
    const whatsappURL = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;

    // 6. Redireciona
    window.open(whatsappURL, '_blank');
}


// Inicializa a função do formulário ao carregar qualquer página
document.addEventListener('DOMContentLoaded', () => {
    setupWhatsappForm();
});