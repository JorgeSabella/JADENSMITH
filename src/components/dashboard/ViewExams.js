import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExams, examData } from '../../store/actions';
import * as jsPDF from 'jspdf'

class Exams extends Component {

    componentDidMount() {
        this.props.fetchExams();
    }

    constructor(props) {
        super(props);
        this.createPDF = this.createPDF.bind(this);
    }

    createPDF(exam_id, quantity) {

        this.props.examData(exam_id,quantity)
/*
        //to center text (doesn't work yet)
        (function(API){
            API.myText = function(txt, options, x, y) {
                options = options ||{};
                /* Use the options align property to specify desired text alignment
                 * Param x will be ignored if desired text alignment is 'center'.
                 * Usage of options can easily extend the function to apply different text
                 * styles and sizes

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

                    var txtWidth = this.getStringUnitWidth(txt)*fontSize/this.internal.scaleFactor;

                    // Calculate text's x coordinate
                    var x = (pageWidth/2) - (txtWidth / 2);
                }

                // Draw text at x,y
                this.text(txt,x,y);
            }
        })(jsPDF.API); */

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
            doc.text(x,y,exam.subject)
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

        /*function printHeaderAnswerSheet (exam) {
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
        }*/

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

    renderPosts() {
      const { posts } = this.props;
        if(!_.isEmpty(posts)) {
            return _.map(posts, post=> {
                return (
                    <div className="col s3 l4" key={post.id}>
                        <div className="card hoverable">
                            <div className="card-image">
                                <img src="img/exam.png"></img>
                                <span className="card-title black-text">{post.text}</span>
                            </div>
                            <div className="card-content">
                                <p>I am a very simple card. I am good at containing small bits of information.
                                    I am convenient because I require little markup to use effectively.
                                </p>
                            </div>
                            <div className="card-action">
                                <button onClick={this.createPDF.bind(this,post.id,3)} className="btn btn-primary" >Exportar</button>
                            </div>
                        </div>
                    </div>
                );
            });
        } else {
            return (
                <div className="preloader-background">
                    <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                    </div>
                </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className = "container">
                <div className="row">
                    {this.renderPosts()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      posts: state.posts,
      exams: state.posts
    };
}

export default connect(mapStateToProps, { fetchExams, examData })(Exams);
