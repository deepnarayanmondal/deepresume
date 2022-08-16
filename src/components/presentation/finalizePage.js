// import React from "react";
// import ResumePreview from './resumePreview'
// import jsPDF from "jspdf";
// import html2canvas from 'html2canvas';
// import { connect } from "react-redux";
// import {useFirestore} from 'react-redux-firebase';

// function Finalize(props) {
//   let educationSection = props.educationSection
//   let contactSection = props.contactSection
//   let document = props.document
//   let firestore=useFirestore();

//   const saveToDatabase = async () => {
//     console.log("saveto data");
//     let user=await firestore.collection('users').doc(props.auth.uid).get();
//     user=user.data();
//     console.log(user);
//     let obj
//     if(user.resumeIds!=undefined){
//       obj={...user.resumeIds,[document.id]:{educationSection:educationSection,contactSection:contactSection,document:document}}
//     }else{
//       obj={[document.id]:{educationSection:educationSection,contactSection:contactSection,document:document}}
//     }

//     firestore.collection('users').doc(props.auth.uid).update({
//       resumeIds:obj
//     })

//   }
//   const downloadResume=()=> {
    
//     const input = document.getElementsByClassName("finalize-preview-card");
//    console.log('document');
//    console.log(input);
//     html2canvas(input)
//       .then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF("p", "mm", "a4");
//         var width = pdf.internal.pageSize.getWidth();
//         var height = pdf.internal.pageSize.getHeight();
//         pdf.addImage(imgData, 'JPEG', 0, 0,width,height);
//         // pdf.output('dataurlnewwindow');
//         pdf.save("resume.pdf");
//       }).catch(function(error){
//         console.log(error)
//       })
//   }
//   return (
//     <div className="container full finalize-page" >
//       <div className="funnel-section ">
//         <div className="finalize-preview-card " id="resumePreview">
//           <ResumePreview contactSection={contactSection} educationSection={educationSection} skinCd={props?.document?.skinCd}></ResumePreview>
//         </div>
//         <div className="finalize-settings center">


//           <div className=" download-resume resume-options">
//             <p className="no-margin"  >
//               Download Resume As PdF
//             </p>
//             <a style={{ cursor: 'pointer' }} onClick={downloadResume}  >download Resume</a>
//           </div>
//           <div className=" download-resume resume-options">
//             <p className="no-margin"  >
//               Save to Database
//             </p>
//             <a style={{ cursor: 'pointer' }} onClick={saveToDatabase}  >Save to Database</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   )

// }
// const mapStateToProps = (state) => {
//   return {
//     document: state.document,
//     educationSection: state.education,
//     contactSection: state.contact,
//     auth:state.firebase.auth
//   }
// }

// export default connect(mapStateToProps)(Finalize)

import React from "react";
import ResumePreview from './resumePreview'
import  jsPDF  from "jspdf";
import html2canvas from 'html2canvas';
import { connect } from "react-redux";

   function Finalize(props) {
    let educationSection= props.educationSection
    let contactSection=props.contactSection
    let documentd=props.document
  
    const saveToDatabase= async()=>{
     
    }
     const downloadResume=()=> {
    
       const input = document.getElementById('resumePreview');
      console.log(input)
       html2canvas(input)
         .then((canvas) => {
           const imgData = canvas.toDataURL('image/png');
           const pdf = new jsPDF("p", "mm", "a4");
           var width = pdf.internal.pageSize.getWidth();
           var height = pdf.internal.pageSize.getHeight();
           pdf.addImage(imgData, 'JPEG', 0, 0,width,height);
           // pdf.output('dataurlnewwindow');
           pdf.save("resume.pdf");
         }).catch(function(error){
           console.log(error)
         })
     }
    return (
      <div className="container full finalize-page" >
      <div className="funnel-section ">
          <div className="finalize-preview-card " id="resumePreview">
            <ResumePreview contactSection={contactSection} educationSection={educationSection} skinCd={props?.document?.skinCd}></ResumePreview>   
          </div>
          <div className="finalize-settings center">            

             
              <div className=" download-resume resume-options">
                <p className="no-margin"  >
                  Download Resume As PdF
                </p>
                    <a style={{cursor:'pointer'}}  onClick={downloadResume}  >download Resume</a>
             </div>
             {/* <div className=" download-resume resume-options">
                <p className="no-margin"  >
                 Save to Database
                </p>
                    <a style={{cursor:'pointer'}}  onClick={saveToDatabase}  >Save to Database</a>
             </div> */}
    </div>
    </div>
    </div>
    )

    
}

const mapStateToProps = (state) => {
    return {
      document: state.document,
      educationSection: state.education,
      contactSection: state.contact,
      auth:state.firebase.auth
    }
  }
  
  export default connect(mapStateToProps)(Finalize)