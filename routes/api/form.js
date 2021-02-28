const express = require('express'); 
const router = express.Router();

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// keys
// const roles = require('../../config/role');


// lodad moddles

// const User = require('../../models/User');

const Form = require('../../models/Form');


// @route   GET api/profile/test
// @decs    Test profile route
// @access  Public

router.get('/test', (req, res) => res.json({ msg: " form is working"}));

// @route   GET api/calsroom
// @decs    Get a class
// @access  private

router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};
  
            Form
            .find({
            })           
            .then(from =>{
            if(!from){
                
                errors.form = "forms is not exist";
                
                return res.status(400).json(errors);
            } 
            
            return res.status(200).json(from);
                
            
        }).catch(err => console.log(err));
   
});

// @route   GET api/calsroom
// @decs    Get a class
// @access  private

// router.get('/department/:classId', passport.authenticate('jwt', {session: false}), (req, res) => {
        
//     const classroomfind = (classId) =>{
//         const errors = {};
//         //user: req.user.branch, user: req.user.section
//         Subject.
//         find({
//             classId
//         })
//         .then(subject =>{
//             if(!subject){
//                 errors.subject = "Subject not found";
//                 return res.status(404).json(errors);
//             }
//             console.log(subject)
//             return res.json(subject);
//         }).catch(err => res.status(400).json(err));
//     }
    
//     const errors = {};

//    if(req.user.role === roles.student){
//         errors.msg = 'Student are not Authrized ';
//         return res.status(400).json(errors);
//     } else if( req.user.role === roles.department)
//     {  
//         //console.log("roles.department=",roles.department)
        

//         const classId = req.params.classId;

//         classroomfind(classId );
//         console.log(req.user.role);
//     }
           
    
// });

// @route   post api/calsroom
// @decs    create a class
// @access  private

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
        const errors = {};
        
                const name = req.body.name;        
                const date = req.body.date;
                const phone = req.body.phone;
                const organization = req.body.organization;
                const rating = req.body.rating;


                
                // const dateString = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();

                Form
                .findOne({
                    name,
                    date,
                    organization,
                    phone,
                    rating
                })           
                .then(form =>{
                    if(form){
                        
                        errors.form = "detail is already exist";
                        
                        return res.status(400).json(errors);
                    } 
                    Form
                    .findOne({
                        
                        phone
                        
                    })           
                    .then(form =>{
                        if(form){
                            
                            errors.phone = "Number is already in use";
                            
                            return res.status(400).json(errors);
                        } 
                        console.log("befor new form")
                        const newform = new Form({
                            name,
                            date,
                            organization,
                            phone,
                            rating
                        })
                        newform.save()
                        .then(form => res.json(form))
                        .catch(err => console.log(err));
                        
                        console.log("after new form");
                    
                
                    }).catch(err => console.log(err));
                    
                
            }).catch(err => console.log(err));
        

        
        
        

        //user: req.user.branch, user: req.user.section
        


});




// @route   delete api/classroom
// @decs    delete a class
// @access  private

// router.delete('/:classId', passport.authenticate('jwt', {session: false}), (req, res) => {
        
//    const classroomfindAndDelete = (classId) =>{
//         const errors = {};
//         //const classId = classId;
//         // const classId = classId;
//             // console.log(classId);
//             Subject
//             .find
//             ({
//                 classId
//             })
//             .then(subject =>{
//                 if(!subject){
//                     errors.subject = "Subject not found";
//                     return res.status(400).json(errors);
//                 }
//                 else{

//                     console.log("subject ====",subject);

//                     const subjectArray   = subject;
//                     const subjectLength = subjectArray.length;
//                     // console.log(l);
//                     for(var i= 0; i<subjectLength; i++){
//                         console.log("id for subject notice ",i," =",subjectArray[i].id);
//                         var subjectId =  subjectArray[i].id;
//                         SubjectNotice
//                         .deleteMany({
//                             subjectId,
//                         })
//                         .then(SubjectNotice =>{
//                             if(!SubjectNotice){
//                                 errors.notes ="there is no notes present in this subject";
//                                 console.log(errors);
//                                 //return res.status(400).json(errors);
//                             }
//                             console.log('notes===', notes);
//                             console.log(`all notes related to this ${SubjectNotice.id} is deleted`);  

//                         })
//                         .catch(err => res.status(400).json(err));

//                         console.log( `subjet relaterd to this id ${subjectId} is ended` );
//                     }
//                     ClassNotice
//                     .deleteMany({
//                         classId
//                     })
//                     .then(ClassNotice =>{
//                         if(!ClassNotice){
//                             errors.subject = "Subject not found";
//                             return res.status(404).json(errors);
//                         }
//                         console.log('subject is deleted', subject, " end of subject delete" )
//                         Subject
//                         .find
//                         ({
//                             classId
//                         })
//                         .then(subject =>{
//                             if(!subject){
//                                 errors.subject = "Subject not found";
//                                 return res.status(400).json(errors);
//                             }
//                             else{

//                                 console.log("subject ====",subject);

//                                 const subjectArray   = subject;
//                                 const subjectLength = subjectArray.length;
//                                 // console.log(l);
//                                 for(var i= 0; i<subjectLength; i++){
//                                     console.log("id  ",i," =",subjectArray[i].id);
//                                     var subjectId =  subjectArray[i].id;
//                                     Notes
//                                     .deleteMany({
//                                         subjectId,
//                                     })
//                                     .then(notes =>{
//                                         if(!notes){
//                                             errors.notes ="there is no notes present in this subject";
//                                             console.log(errors);
//                                             //return res.status(400).json(errors);
//                                         }
//                                         console.log('notes===', notes);
//                                         console.log(`all notes related to this ${notes.id} is deleted`);  

//                                     })
//                                     .catch(err => res.status(400).json(err));

//                                     console.log( `subjet relaterd to this id ${subjectId} is ended` );
//                                 }
//                                 Subject
//                                 .deleteMany({
//                                     classId
//                                 })
//                                 .then(subject =>{
//                                     if(!subject){
//                                         errors.subject = "Subject not found";
//                                         return res.status(404).json(errors);
//                                     }
//                                     console.log('subject is deleted', subject, " end of subject delete" )
//                                     console.log("classId",classId)
//                                     ClassRoom
//                                     .findOneAndDelete({
//                                         _id: classId,
//                                     }).then(classRoom =>{
//                                         if(!classRoom){
//                                             errors.classRoomis = "There is no class found"
//                                             return res.status(400).json(errors);
//                                         }
//                                         ClassRoom
//                                         .find({
//                                         })           
//                                         .then(classRooms =>{
//                                         if(!classRooms){
                                            
//                                             errors.classroom = "classes is not exist";
                                            
//                                             return res.status(400).json(errors);
//                                         } 
                                        
//                                         return res.status(200).json(classRooms);
                                            
                                        
//                                     }).catch(err => console.log(err));
//                                     })
//                                     .catch(err => res.status(400).json(err));
//                                 })
//                                 .catch(err => res.status(400).json(err));
//                             }
                            
                                
//                         })
//                         .catch(err => res.status(400).json(err));
//                     })
//                     .catch(err => res.status(400).json(err));
//                 }
                
                    
//             })
//             .catch(err => res.status(400).json(err));
//     }


//     if(req.user.role === roles.student ){
//         errors.msg = " user not allow to delete";
//         return res.status(400).json(errors);
//     }
//     else if( req.user.role === roles.department)
//     {  
//         // console.log("roles.department=",roles.department)
//         const classId = req.params.classId;
//         console.log("outer class id ",classId);
//         classroomfindAndDelete(classId);
//         // console.log(req.user.role);
//     }
           
    
// });


// @route   get api/calsroom/all
// @decs    get all class
// @access  private
// router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {
//     const errors = {};
//     //console.log( req.user.role, " starting ");
//     if(req.user.role === roles.student){
//         errors.msg = 'Student are not Authrized ';
//         return res.json(errors);
//     } else if (req.user.role === roles.department   ){
            


//             ClassRoom
//             .find({
//             })           
//             .then(classRooms =>{
//             if(!classRooms){
                
//                 errors.classroom = "classes is not exist";
                
//                 return res.status(400).json(errors);
//             } 
            
//             return res.status(200).json(classRooms);
                
            
//         }).catch(err => console.log(err));
//     }

    
    
    

//     //user: req.user.branch, user: req.user.section
    


// });



module.exports = router;