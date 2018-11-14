import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExam } from '../../store/actions/index';
import { fetchFinalExams } from '../../store/actions/finalExamsActions';
import { fetchExamInfo } from '../../store/actions/examInfoActions';
import * as jsPDF from 'jspdf'

class ExamQuestions extends Component {

    constructor(props) {
        super(props);
        this.state = {
          quantity: 1
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        const { params } = this.props.match;
        this.props.fetchExam(params.id);
        this.props.fetchExamInfo(params.id);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;

        this.setState({
          quantity: value
        });
    }


    createPDF() {
        const { params } = this.props.match;
        this.props.fetchFinalExams(params.id,this.state.quantity);

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

    renderExamInfo() {
        const { examInfo } = this.props;
        console.log("ahuevo");
        console.log(examInfo);
        if (examInfo) {
          return _.map(examInfo, exam => {
              return (
                  <li>
                      <div><span>Nombre del examen: {exam.name} </span></div>
                      <div><span>Institución: {exam.institution} </span></div>
                      <div><span>Profesor: {exam.professor} </span></div>
                      <div><span>Subject: {exam.subject} </span></div>
                  </li>
              );
          });
        } else {
          console.log("no hay examen")
        }
    }

    renderQuestions() {
        const { posts } = this.props;
        console.log(posts)
        if(posts) {
            return _.map(posts, post => {
                return (
                    <li>
                        <div className="collapsible-header"><i class="material-icons">descripcion</i>{post.name}</div>
                        <div className="collapsible-body"><span>{post.text}</span></div>
                    </li>
                );
            });
        } else {
            console.log("no hay preguntas")
        }
    }

    render () {
        return (
            <div className="container white">
                <form className = "white" >
                    <h4>Detalles del examen</h4>
                    <ul className="collapsible">
                        {this.renderExamInfo()}
                    </ul>
                    <h4>Preguntas</h4>
                    <ul className="collapsible">
                        {this.renderQuestions()}
                    </ul>
                </form>
                <input type="number" value={this.state.quantity} onChange={this.handleInputChange}/>
                <button onClick={this.createPDF.bind(this)} className="btn btn-primary" >Guardar</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        examInfo: state.examInfo,
        finalExams: state.finalExams
    };
}

export default connect(mapStateToProps, { fetchExam, fetchFinalExams, fetchExamInfo })(ExamQuestions);
