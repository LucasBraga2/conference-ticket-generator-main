document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('ticket-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Coleta os dados
      const name = document.getElementById('full-name').value.trim();
      const email = document.getElementById('email').value.trim();
      const github = document.getElementById('github').value.trim();
      const avatarInput = document.getElementById('avatar');
      let avatarUrl = '';

      // Validação simples
      if (!name || !email || !github || !avatarInput.files[0]) {
        alert('Preencha todos os campos e envie um avatar.');
        return;
      }

      // Validação do avatar (tamanho e tipo)
      const file = avatarInput.files[0];
      if (!['image/png', 'image/jpeg'].includes(file.type) || file.size > 500 * 1024) {
        alert('Avatar deve ser PNG ou JPG e até 500kb.');
        return;
      }

      // Lê o avatar como DataURL (base64)
      const reader = new FileReader();
      reader.onload = function(event) {
        avatarUrl = event.target.result;

        // Salva no localStorage
        localStorage.setItem('ticketData', JSON.stringify({
          name,
          email,
          github,
          avatarUrl
        }));

        // Redireciona
        window.location.href = 'ticket.html';
      };
      reader.readAsDataURL(file);
    });
  }
});