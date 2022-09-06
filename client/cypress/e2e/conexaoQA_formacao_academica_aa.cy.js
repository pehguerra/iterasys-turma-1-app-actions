import { register } from '../../src/actions/auth'
import { createProfile, addEducation } from '../../src/actions/profile'

describe('Formação Academica AA', () => {

    let educationId = ''

    before(() => {
        cy.task('dbCleanUp')

        cy.visit('/')

        cy.intercept('PUT', '/api/profile/education')
            .as('educacao')

        // cadastrar usuario
        cy.cadastrarUsuario({ name: 'Iterasys AA', email: 'iterasysAA@teste.com', password: '123456' })

        // cadastrar perfil
        cy.window()
            .its('store')
            .invoke('dispatch', createProfile({ status: 'Especialista em QA', skills: 'Cypress, Automação' }))
    
        // cadastrar educacao
        cy.window()
            .its('store')
            .invoke('dispatch', addEducation({ school: 'Escola', degree: 'Título', fieldofstudy: 'Area de Conhecimento', from: '2021-05-12T01:47:00.000Z', current: true }))
    
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

        cy.tirarScreenshot()
    })
})