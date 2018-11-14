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

    requestProps() {
      this.props.examData("ebda3f69-22f2-4a42-8ec0-f0e3a91d35b0",3);
    }

    createPDF() {
      this.requestProps();
        //to center text (doesn't work yet)
        (function(API){
            API.myText = function(txt, options, x, y) {
                options = options ||{};
                /* Use the options align property to specify desired text alignment
                 * Param x will be ignored if desired text alignment is 'center'.
                 * Usage of options can easily extend the function to apply different text
                 * styles and sizes
                */
                if( options.align == "center" ){
                    // Get current font size
                    var fontSize = this.internal.getFontSize();

                    // Get page width
                    var pageWidth = this.internal.pageSize.width;

                    // Get the actual text's width
                    /* You multiply the unit width of your string by your font size and divide
                     * by the internal scale factor. The division is necessary
                     * for the case where you use units other than 'pt' in the constructor
                     * of jsPDF.
                    */
                    var txtWidth = this.getStringUnitWidth(txt)*fontSize/this.internal.scaleFactor;

                    // Calculate text's x coordinate
                    var x = (pageWidth/2) - (txtWidth / 2);
                }

                // Draw text at x,y
                this.text(txt,x,y);
            }
        })(jsPDF.API);

        //to jump line in main doc
        function nextLine () {
            if (y > 720) {
                doc.addPage()
                y = 72
            } else {
                y += jump
            }
        }

        //to jump line in answer sheet
        function nextLineAS() {
            if (ys > 720) {
                as.addPage()
                ys = 72
            } else {
                ys += jump
            }
        }

        function printHeader(exam,numExamen) {
            doc.myText(exam.subject,{align: "center"},x,y)
            nextLine()
            doc.text(x,y,exam.name)
            nextLine()
            doc.text(x,y,exam.institution)
            nextLine()
            doc.text(x,y,exam.professor)
            nextLine()
            doc.text(x,y,"Examen tipo: " + numExamen)
            nextLine()
            _.map(exam.text_fields, textField => {
                doc.text(x,y,textField.key)
                nextLine()
            })
            nextLine()
            nextLine()
            nextLine()
        }

        function printHeaderAnswerSheet (exam) {
            as.text(xs,ys,exam.subject)
            nextLineAS()
            as.text(xs,ys,exam.name)
            nextLineAS()
            as.text(xs,ys,exam.institution)
            nextLineAS()
            as.text(xs,ys,exam.professor)
            nextLineAS()
            nextLineAS()

            as.text(xs,ys,"Hoja de respuestas")
            nextLineAS()
        }

        function printQuestion(question, questionNum) {
            if (question.tipo == 1 || question.tipo == 2) {
                doc.text(x,y,questionNum + ". " + question.text + " " + question.equation)
                nextLine()
                var letterNum = 0 //to start with 'a'
                if (!_.isEmpty(question.answers)) {
                    _.map(question.answers, answer => {
                        doc.text(x,y,"     " + String.fromCharCode(97 + letterNum) + ". " + answer.text + " " + answer.equation) //97 + letterNum to get lowercase letters
                        nextLine()
                        if (answer.correct) {
                            as.text(xs,ys,questionNum + ". " + String.fromCharCode(97 + letterNum))
                            nextLineAS()
                        }
                        letterNum += 1
                    })
                }
            } else if (question.tipo == 3) {
                doc.text(x,y,question.text + " " + question.equation)
                nextLine()
                nextLine()
                nextLine()
                nextLine()
            }
        }

        var doc = new jsPDF('p','pt','letter') //main (exams)
        var as = new jsPDF('p','pt','letter') //answerSheets
        //orientation (portrait), unit for coordinates (pt points), format/size of first page (letter)
        //Letter size: 612 × 792 points
        // 1 inch margin = 72 points
        var x = 72 //main coordinates
        var y = 72 //main coordinates
        var xs = 72 //answerSheets coordinates
        var ys = 72 //answerSheets coordinates
        var font_size = 12
        var line_spacing = 1.5
        var jump = font_size * line_spacing
        doc.setFont('times')
        doc.setFontSize(font_size)
        as.setFont('times')
        as.setFontSize(font_size)


        //printHeaderAnswerSheet(this.props.exams[0])

        var numExamen = 1

        //For each exam
        _.map(this.props.exams, exam => {

            as.text(xs,ys,"Examen " + numExamen)
            nextLineAS()

            printHeader(exam, numExamen)
            var questionNum = 1

            //For each question in the exam
            if (!_.isEmpty(exam.questions)) {
                _.map(exam.questions, question => {
                    printQuestion(question, questionNum)
                    questionNum += 1
                })
            }


            //Add page and start at top for next exam to print
            doc.addPage()
            as.addPage()
            y = 72
            ys = 72
            numExamen += 1
            nextLineAS()
        })

        doc.save('test.pdf')
        as.save('answerSheet.pdf')
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
