# Release Candidate Validation (RCV-001) - Cenários de Teste End-to-End

O objetivo destes testes é garantir a robustez da arquitetura, a persistência de dados e a independência modular antes da validação pedagógica com utilizadores finais. Estes cenários confirmam que qualquer anomalia no comportamento será pedagógica e não da infraestrutura.

## Cenário 1: Fluxo do Investigador (WF-INV)
**Objetivo:** Validar o percurso completo de um novo projeto de investigação.

1. **Criação:** Na Homepage, clicar em "Novo Projeto", selecionar "Revisão da Literatura" (Investigador), introduzir o título e a área.
2. **Navegação:** Avançar do Passo 1 (Ouvir) até ao Passo 3 (Desafiar) no workflow do Investigador.
3. **Persistência:** Fazer refresh da página. Verificar se a aplicação retoma no Passo 3 do mesmo projeto.
4. **Output:** Gerar notas (gravar na text area) no Passo 3.
5. **Exportação:** Ir ao menu global e fazer o download (Backup) do projeto.
6. **Importação:** Num modo "Incógnito" (ou limpando os dados locais), importar o ficheiro `.json` gravado. Confirmar que o projeto restaura corretamente no Passo 3 com as notas intactas.

## Cenário 2: Fluxo do Supervisor (WF-SUP)
**Objetivo:** Validar o percurso completo de um novo projeto de supervisão e ferramentas de acompanhamento.

1. **Criação:** Na Homepage, clicar em "Novo Projeto", selecionar "Guia do Supervisor", introduzir o título e a área.
2. **Timeline:** Verificar se a linha de progresso corresponde estritamente às etapas do Supervisor (ex: Passo 1 é "Análise Geral", não "Ouvir").
3. **Interação:** Preencher as "Notas do Supervisor" e consultar as "Boas Práticas" no painel de contexto.
4. **Recursos IA:** Abrir o "Centro de Recursos IA" e confirmar que o tab "Supervisor" está ativo e povoado com os recursos corretos do módulo `WF-SUP`.
5. **Persistência:** Sair para a Homepage e reabrir o projeto do Supervisor. Confirmar se o estado, o badge e a timeline se mantêm.

## Cenário 3: Alternância Modular e Contaminação (Critério 5)
**Objetivo:** Assegurar que os dois workflows podem coexistir lado a lado sem partilha indevida de estado ou conflito no `rgWorkspace`.

1. **Setup:** Criar um projeto `WF-INV` ("Projeto Teste INV") e um projeto `WF-SUP` ("Projeto Teste SUP").
2. **Contexto INV:** Abrir "Projeto Teste INV". Navegar para o Passo 5. Escrever um texto na text area.
3. **Contexto SUP:** Voltar à Homepage e abrir o "Projeto Teste SUP". Confirmar se:
   - A timeline é a do Supervisor e começa/está no Passo 1.
   - O Badge no topo diz "Guia do Supervisor" (com ícone de grupo/users).
   - O conteúdo escrito no projeto INV **não** transita para o projeto SUP.
4. **Regresso:** Voltar novamente ao "Projeto Teste INV". Confirmar que retoma no Passo 5, com o texto intato, com o badge "Revisão da Literatura".

## Critérios de Saída (QA Exit Criteria para RCV-001)
- 100% de sucesso nos cenários acima descritos.
- Nenhum erro de consola ("Uncaught Exception") durante as transições.
- A importação de backups antigos (`v1`) é preservada.
