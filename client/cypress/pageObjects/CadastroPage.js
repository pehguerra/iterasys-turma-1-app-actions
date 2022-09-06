class CadastroPage {

    visitar() {
        cy.visit('/cadastrar')
    }

    preencherNome(nome) {
        cy.getElement('register-name')
            .type(nome)

        return this
    }

    preencherEmail(email) {
        cy.getElement('register-email')
            .type(email)

        return this
    }

    preencherSenha(senha) {
        cy.getElement('register-password')
            .type(senha)

        return this
    }

    preencherSenha2(senha) {
        cy.getElement('register-password2')
            .type(senha)

        return this
    }

    submit() {
        cy.getElement('register-submit')
            .click()
    }
}

export default CadastroPage