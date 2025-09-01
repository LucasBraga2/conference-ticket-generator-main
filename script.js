document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('ticket-form');
  const avatarInput = document.getElementById('avatar');
  const avatarPreview = document.getElementById('avatar-preview');
  
  // Função para mostrar preview da imagem selecionada
  if (avatarInput && avatarPreview) {
    avatarInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        // Limpa mensagem de erro do avatar
        document.getElementById('avatar-error').textContent = '';
        
        // Valida tipo e tamanho do arquivo
        if (!['image/png', 'image/jpeg'].includes(file.type)) {
          document.getElementById('avatar-error').textContent = "Avatar deve ser PNG ou JPG.";
          return;
        }
        
        if (file.size > 500 * 1024) {
          document.getElementById('avatar-error').textContent = "Avatar deve ter no máximo 500kb.";
          return;
        }
        
        // Mostra preview da imagem
        const reader = new FileReader();
        reader.onload = function(event) {
          avatarPreview.src = event.target.result;
          avatarPreview.style.borderRadius = '50%';
          avatarPreview.style.objectFit = 'cover';
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Coleta os dados
      const name = document.getElementById('full-name').value.trim();
      const email = document.getElementById('email').value.trim();
      let github = document.getElementById('github').value.trim();
      let avatarUrl = '';

      // 1. Validação simples: todos os campos preenchidos
      if (!name || !email || !github || !avatarInput.files[0]) {
        // alert('Preencha todos os campos e envie um avatar.');
        if (!avatarInput.files[0]) {
          alert('Avatar é obrigatório.');
          // document.getElementById('avatar-error').textContent = "Avatar é obrigatório.";
        }
        if (!name) {
          document.getElementById('name-error').textContent = "Nome é obrigatório.";
        }
        if (!email) {
          document.getElementById('email-error').textContent = "Email é obrigatório.";
        }
        if (!github) {
          document.getElementById('github-error').textContent = "GitHub username é obrigatório.";
        }
        return;
      }

      // 2. Validar que a pessoa escreveu apenas o primeiro nome (sem regex)
       const isFirstNameOnly = !name.includes(' ');
       if (isFirstNameOnly) {
         //alert('Digite nome e sobrenome');
        //document.getElementById('name-error').textContent = "Digite nome e sobrenome";
      //   // Exemplo toast:
       Toastify({ text: "Digite nome e sobrenome", duration: 3000, gravity: "top", position: "right", backgroundColor: "#ff4d4f" }).showToast();
       return;
     }

      // 3. Validar que escreveu nome e sobrenome (um campo só, sem regex)
      // const parts = name.trim().split(' ');
      // const hasFullName = parts.length > 1 && parts[0] && parts[1];
      // if (!hasFullName) {
      //   document.getElementById('name-error').textContent = "Digite nome e sobrenome";
      //   // Para mostrar acima do campo, coloque o .error-message antes do input no HTML
      //   // Para mostrar como alert:
      //   // alert("Digite nome e sobrenome");
      //   return;
      // }

      // 4. Validação do avatar (tamanho e tipo)
      const file = avatarInput.files[0];
      if (!['image/png', 'image/jpeg'].includes(file.type) || file.size > 500 * 1024) {
        // alert('Avatar deve ser PNG ou JPG e até 500kb.');
         document.getElementById('avatar-error').textContent = "Avatar deve ser PNG ou JPG e até 500kb.";
        return;
      }

      // 5. Validar usuário do GitHub (deve começar com @)
      // if (!github.startsWith('@')) {
       //  alert('Inclua o @ no seu usuário do GitHub');
      //   // document.getElementById('github-error').textContent = "Inclua o @ no seu usuário do GitHub";
      //   // Toastify({ text: "Inclua o @ no seu usuário do GitHub", duration: 3000, gravity: "top", position: "right", backgroundColor: "#ff4d4f" }).showToast();
       //  return;
    //   }

      // 6. Adicionar "@" automaticamente se não escreveu
       github = github.startsWith('@') ? github : '@' + github;

      // 7. Mostrar o GitHub sempre com um só "@"
      // github = '@' + github.replace(/^@+/, '');

      // 8. Validar e formatar o e-mail para minúsculas automaticamente
      //const emailFormatted = email.trim().toLowerCase();

      // 9. Desabilitar o botão de submit enquanto houver erro
      // (Exemplo: form.querySelector('button[type="submit"]').disabled = true;)

      // 10. Exemplo de toastify para qualquer erro
      Toastify({
        text: "Sua mensagem de erro ou sucesso!",
        duration: 3000,
        gravity: "top",
        position: "right", 
        backgroundColor: "#ff4d4f"
      }).showToast();

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