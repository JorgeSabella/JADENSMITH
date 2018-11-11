import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as jsPDF from 'jspdf'
import { examData } from '../../store/actions';

class TestPDF extends Component {
    
    constructor(props) {
        super(props);
        this.createPDF = this.createPDF.bind(this);
    }
    
    componentDidMount() {
        this.props.examData();
    }
    
    createPDF() {
        function nextLine () {
            if (y > 720) {
                doc.addPage()
                y = 72
            } else {
                y += jump
            }
        }
        
        function printHeader(exam) {
            doc.text(x,y,exam.subject)
            nextLine()
            doc.text(x,y,exam.name)
            nextLine()
            doc.text(x,y,exam.institution)
            nextLine()
            doc.text(x,y,exam.professor)
            nextLine()
            
            _.map(exam.text_fields, textField => {
                doc.text(x,y,textField.key)
                nextLine()
            })
            //doc.text(x,y,'Matricula:_____________       Nombre: ______________________________________')
            //nextLine()
            //doc.text(x,y,'Fecha:______________')
            nextLine()
            nextLine()
            nextLine()
        }
        
        function printQuestion(question) {
            if (question.tipo == 1 || question.tipo == 2) {
                doc.text(x,y,question.text + " " + question.equation)
                nextLine()
                _.map(question.answers, answer => {
                    doc.text(x,y,"     a. " + answer.text + " " + answer.equation)
                    nextLine()
                })
            } else if (question.tipo == 3) {
                doc.text(x,y,question.text + " " + question.equation)
                nextLine()
                nextLine()
                nextLine()
                nextLine()
            }
        }
        
        var doc = new jsPDF('p','pt','letter') //orientation (portrait), unit for coordinates (pt points), format/size of first page (letter)
        //Letter size: 612 × 792 points
        // 1 inch margin = 72 points
        var x = 72
        var y = 72
        var font_size = 12
        var line_spacing = 1.5
        var jump = font_size * line_spacing
        doc.setFont('times')
        doc.setFontSize(font_size)
        
        //For each exam
        _.map(this.props.exams, exam => {
            
            printHeader(exam)
            
            //For each question in the exam
            _.map(exam.questions, question => {
                printQuestion(question)
            })
            
            
            //Add page and start at top for next exam to print
            doc.addPage()
            y = 72
        })
        
        //HEADER
        //printHeader()

        //EJEMPLO PREGUNTA OPCION MULTIPLE
        //printMultipleChoice(0)

        //EJEMPLO PREGUNTA ABIERTA
        //printOpen(0)

        //EJEMPLO PREGUNTA V/F
        //printTrueFalse(0)


        var i;
        for (i = 0; i < 40; i++) { 
            //printMultipleChoice(i)
        }



        doc.save('test.pdf')
        
    }
    
    
    //just for testing, must be deleted when no longer necessary
    renderExamsInfo() {
        return _.map(this.props.exams, exam => {
            return (
                <div key={exam.id}>
                {exam.subject}
                {exam.name}
                {exam.institution}
                </div>
            )
        })
    }

    render() {
        /*return _.map(questions.undefined, question => {
            return (
                <div className="question" key={question.name}>
                    <div> {question.name} </div>
                </div>
            )
        })*/
        const { exams } = this.props;
        return (
            <div className="container">
            {this.renderExamsInfo()}
                    <button onClick={this.createPDF} className="btn btn-primary" >Guardar</button>
            </div>
        )
            /*<div className="container">
                    <button onClick={this.createPDF} className="btn btn-primary" >Guardar</button>
            </div>*/
        /*return _.map(examData, post=> {
        return (
            <div className="container">
                    <button onClick={createPDF} className="btn btn-primary" >Guardar</button>
                    <p>{post.subject}</p>
            </div>
        );
        }); */
    }
}





//PDFTEST
/*
var doc = new jsPDF('p','pt','letter') //orientation (portrait), unit for coordinates (pt points), format/size of first page (letter)
//Letter size: 612 × 792 points
// 1 inch margin = 72 points
var x = 72
var y = 72
var font_size = 12
var line_spacing = 1.5
var jump = font_size * line_spacing

function nextLine () {
    if (y > 720) {
        doc.addPage()
        y = 72
    } else {
        y += jump
    }
}

function printHeader () {
    doc.text(x,y,'Análisis y Modelación de Sistemas de Software')
    nextLine()
    doc.text(x,y,'Revisión de conceptos')
    nextLine()
    doc.text(x,y,'Instituto Tecnológico de Monterrey')
    nextLine()
    doc.text(x,y,'Profesor Antonio Mejorado')
    nextLine()
    doc.text(x,y,'Matricula:_____________       Nombre: ______________________________________')
    nextLine()
    doc.text(x,y,'Fecha:______________')
    nextLine()
    nextLine()
    nextLine()
}

function printMultipleChoice(number) {
    doc.text(x,y,number + '. Este es un ejemplo de una pregunta de opción múltiple')
    nextLine()
    doc.text(x,y,'     a. Opción 1')
    nextLine()
    doc.text(x,y,'     b. Opción 2')
    nextLine()
    doc.text(x,y,'     c. Opción 3')
    nextLine()
    doc.text(x,y,'     d. Opción 4')
    nextLine()
}

function printOpen(number) {
    doc.text(x,y,number + '. Este es un ejemplo de una pregunta abierta')
    nextLine()
    nextLine()
    nextLine()
    nextLine()
}

function printTrueFalse(number) {
    doc.text(x,y,number + '. Este es un ejemplo de una pregunta de verdadero/falso')
    nextLine()
    doc.text(x,y,' a. Verdadero')
    nextLine()
    doc.text(x,y,' b. Falso')
    nextLine()
}

function createPDF2 () {

    doc.setFont('times')
    doc.setFontSize(font_size);
    
    //HEADER
    printHeader()
    
    //EJEMPLO PREGUNTA OPCION MULTIPLE
    printMultipleChoice(0)
    
    //EJEMPLO PREGUNTA ABIERTA
    printOpen(0)
    
    //EJEMPLO PREGUNTA V/F
    printTrueFalse(0)
    
    
    var i;
    for (i = 0; i < 40; i++) { 
        printMultipleChoice(i)
    }
    
    
    
    doc.save('test.pdf')
}

*/


function mapStateToProps(state) {
    return { 
        exams : state.posts
    };
}

export default connect(mapStateToProps, { examData })(TestPDF);