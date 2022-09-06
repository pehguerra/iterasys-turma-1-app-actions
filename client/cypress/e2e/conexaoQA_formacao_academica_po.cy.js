import CadastroPage from '../pageObjects/CadastroPage'
import PerfilPage from '../pageObjects/PerfilPage'
import FormacaoAcademicaPage from '../pageObjects/FormacaoAcademicaPage'

describe('formação academica PO', () => {
    
    let educationId = ''

    before(() => {
        cy.task('dbCleanUp')

        cy.intercept('GET', '/api/profile/me')
            .as('registro')

        cy.intercept('PUT', '/api/profile/education')
            .as('educacao')

        const cadastro = new CadastroPage()
        cadastro.visitar()
        cadastro.preencherNome('Iterasys AA')
        cadastro.preencherEmail('iterasysAA@teste.com')
        cadastro.preencherSenha('123456')
        cadastro.preencherSenha2('123456')
        cadastro.submit()

        cy.wait('@registro')

        // cadastrar perfil
        const perfil = new PerfilPage()
        perfil.visitar()
        perfil.selecionarStatus('Estudante ou Aprendendo')
        perfil.preencherConhecimentos('JavaScript, Cypress')
        perfil.submit()

        cy.wait('@registro')

        // cadastrar a formação acadêmica
        const formacao = new FormacaoAcademicaPage()
        formacao.visitar()
        formacao.preencherEscola('escola')
        formacao.preencherGrau('grau')
        formacao.preencherCurso('curso')
        formacao.preencherInicio('03/05/2021')
        formacao.selecionarCursando()
        formacao.submit()

        cy.wait('@educacao')
            .then(({ response }) => {
                educationId = response.body.education[0]._id
            })
    })

    it('exclui formação academica', () => {
        cy.intercept('DELETE', `/api/profile/education/${educationId}`)
            .as('deletarEducacao')

        cy.getElement('education-delete')
            .click()
            .wait('@deletarEducacao')

        cy.getElement('education-delete')
            .should('not.exist')
    })
})