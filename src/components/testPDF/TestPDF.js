import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as jsPDF from 'jspdf'
import { examData } from '../../store/actions';

class TestPDF extends Component {
    
    /*state = {"subject":"Mate","name":"Parcial 1","institution":"Tec de Monterrey","professor":"Mejorado","text_fields":[{"key":"Nombre: ","body":null}],"questions":[{"name":"Factorizacion","text":"Factoriza el pedo ilv","tipo":1,"equation":"(2x + 4x^2)","answers":[{"correct":true,"tipo":1,"text":null,"equation":"2x(1+2x)"}]}]} */
    
    
    componentDidMount() {
        this.props.examData();
    }

    render() {
        const { exams } = this.props;
        /*return _.map(questions.undefined, question => {
            return (
                <div className="question" key={question.name}>
                    <div> {question.name} </div>
                </div>
            )
        })*/
        return (
            <div className="container">
                    <button onClick={createPDF} className="btn btn-primary" >Guardar</button>
            </div>
        );
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





/////////////////////////////////////HI PDF////////////////////////////////////
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

function createPDF () {

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



///////////////////////////////////////BYE PDF/////////////////////////////////

function mapStateToProps(state) {
    return { 
        exams : state.posts
    };
}

export default connect(mapStateToProps, { examData })(TestPDF);