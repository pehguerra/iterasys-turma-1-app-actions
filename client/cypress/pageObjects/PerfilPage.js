class PerfilPage {
    visitar() {
        cy.visit('/criar-perfil')
    }

    preencherConhecimentos(valor) {
        cy.getElement('profile-skills')
            .type(valor)

        return this
    }

    selecionarStatus(valor) {
        let option = 0

        switch(valor) {
            case 'Estudante ou Aprendendo':
                option = 0
                break
            case 'QA Junior':
                option = 1
                break
            default:
                option = 0
        }

        cy.getElement('profile-status')
            .click()

        cy.getElement(`status-${option}`)
            .click()

        return this
    }

    submit() {
        cy.getElement('profile-submit')
            .click()
    }
}

export default PerfilPage