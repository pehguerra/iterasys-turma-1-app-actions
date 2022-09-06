import { register } from '../../src/actions/auth'

Cypress.Commands.add('getElement', (seletor) => {
    return cy.get(`[data-test=${seletor}]`)
})

Cypress.Commands.add('cadastrarUsuario', (usuario) => {

    cy.window()
        .its('store')
        .invoke('dispatch', register(usuario))
})

// Custom Commands não é APP ACTION
Cypress.Commands.add('tirarScreenshot', () => {

    cy.log('Estou tirando uma screenshot')
    cy.screenshot()
})