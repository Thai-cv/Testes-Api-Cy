pipeline {
    agent any

    stages {
        stage('Clonar o Repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/Thai-cv/Testes-Api-Cy.git'
            }
        }
                
        stage('Instalar dependecias') {
            steps {
            bat 'npm install'    
            }
        }

        stage('Executar Testes') {
            steps {
               bat 'npm run cy:run' 
            }
        }
    }  
}    