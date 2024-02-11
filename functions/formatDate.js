function formatDate(date) {
    const options = { 
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Sao_Paulo'
    };

    return date.toLocaleString('pt-BR', options);
}

module.exports = formatDate;
