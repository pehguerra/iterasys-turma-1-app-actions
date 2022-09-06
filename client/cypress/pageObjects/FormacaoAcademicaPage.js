class FormacaoAcademicaPage {
    visitar() {
        cy.visit('/adicionar-formacao')
    }

    preencherEscola(valor) {
        cy.getElement('education-school')
            .type(valor)

        return this
    }

    preencherGrau(valor) {
        cy.getElement('education-degree')
            .type(valor)

        return this
    }

    preencherCurso(valor) {
        cy.getElement('education-fieldOfStudy')
            .type(valor)

        return this
    }

    preencherInicio(valor) {
        cy.getElement('education-from')
            .type(valor)
    }

    selecionarCursando() {
        cy.getElement('education-current')
            .click()
    }

    submit() {
        cy.getElement('education-submit')
            .click()
    }
}

export default FormacaoAcademicaPage