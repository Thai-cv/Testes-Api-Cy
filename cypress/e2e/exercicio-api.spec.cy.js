/// <reference types="cypress" />
var faker = require('faker');

import contrato from '../contracts/usuarios.contract.cy'


describe('Testes da Funcionalidade Usuários', () => {

    it('Deve validar contrato de usuários', () => {
     cy.request('usuarios').then(response => {
          return contrato.validateAsync(response.body)
      })
    });

    it('Deve listar usuários cadastrados', () => {
     cy.request({
          method: 'GET',
          url: 'usuarios'
      }).then((response) => {
          expect(response.status).to.equal(200)
          expect(response.body).to.have.property('usuarios')
          expect(response.duration).to.be.lessThan(450)
      })
    });

    it('Deve cadastrar um usuário com sucesso', () => {
    cy.cadastrarUsuario().then((response) => {
          expect(response.status).to.equal(201)
          expect(response.body.message).to.equal("Cadastro realizado com sucesso")
      })
    });

    it('Deve validar um usuário com email inválido', () => {
     cy.request({
          method: 'POST',
          url: 'usuarios',
          body: {
               "nome": "Eduardo Oliveira",
               "email": "eduardoqa#teste",
               "password": "teste",
               "administrador": "true"
             },  failOnStatusCode: false 
      
          }).then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body.email).to.equal('email deve ser um email válido')
     })
    
    });

    it('Deve editar um usuário previamente cadastrado', () => {
        let nomeFaker = faker.name.firstName()
        let emailFaker = faker.internet.email()
        cy.cadastrarUsuario().then(response => { 
            let id = response.body._id
          cy.request({
              method: 'PUT', 
              url: `usuarios/${id}`,
              body: 
              {
               nome: nomeFaker,
               email: emailFaker,
               password: "teste",
               administrador: "true",
                }
          }).then(response => {
               expect(response.status).to.equal(200)
              expect(response.body.message).to.equal('Registro alterado com sucesso')
          })
      })

    });

    it('Deve deletar um usuário previamente cadastrado', () => {
        cy.cadastrarUsuario().then(response => { 
            let id = response.body._id
         cy.request({
          method: 'DELETE',
          url: `usuarios/${id}`,
      }).then(response =>{
          expect(response.body.message).to.equal('Registro excluído com sucesso')
          expect(response.status).to.equal(200)
      })
    });
});
});
