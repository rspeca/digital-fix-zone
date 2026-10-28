# Lovable Tech Support

Gostaria criasse um site manunteção de Computadores com pagina home serviços  Baixar drives  Baixar sistemas Fale conosco whats 19982497244 e instagram e facebook nas cores modernas

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://digital-fix-zone.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/684713ff-0b75-46b1-bc10-a296abb094fd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```


## Painel administrativo com banco de dados

O painel fica em `/admin` e usa Supabase Auth + PostgreSQL para que as configurações sejam compartilhadas com o site público. Não existe senha fixa no código.

### Configuração necessária (uma vez)

1. Crie um projeto no Supabase e abra o **SQL Editor**.
2. Execute todo o arquivo `supabase/migrations/20261028000000_site_admin.sql`.
3. Em **Authentication → Users**, crie o usuário administrador com o e-mail e a senha que você deseja usar.
4. Copie o UUID desse usuário e execute no SQL Editor, substituindo o texto de exemplo: `insert into public.site_admins (user_id) values ('AUTH_USER_UUID_HERE');`
5. Nas variáveis de ambiente do ambiente que publica o site, configure `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` usando a URL do projeto e a chave pública (anon/publishable) do Supabase. Consulte `.env.example`.
6. Faça uma nova publicação/build do site. Depois, acesse `/admin` e entre com o e-mail e a senha criados no passo 3.

Apenas usuários incluídos em `public.site_admins` podem salvar configurações. A leitura pública usa uma política RLS própria. **Nunca** exponha a chave `service_role` no navegador ou em variáveis `VITE_*`.

O painel permite editar nome do site, títulos e textos principais, área de atendimento, logotipo, foto principal, WhatsApp, Instagram, Facebook e links de downloads. As imagens enviadas são limitadas a 1 MB cada e guardadas nas configurações do banco.

Até que o projeto Supabase e as variáveis de ambiente sejam configurados, o formulário de login permanece desativado. O código no GitHub, sozinho, não cria o projeto Supabase nem define as credenciais do administrador.
