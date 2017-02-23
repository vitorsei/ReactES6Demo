// import delay from './delay';
//
// // This file mocks a web API by working with the hard-coded data below.
// // It uses setTimeout to simulate the delay of an AJAX call.
// // All calls return promises.
// const courses = [
//     {
//         id: "mind-reading",
//         title: "Mind Reading",
//         watchHref: "https://en.wikipedia.org/wiki/Jean_Grey",
//         authorId: "jean-gray",
//         length: "05:08",
//         category: "Mind Power"
//     },
//     {
//         id: "telekinesis",
//         title: "Telekinesis",
//         watchHref: "https://en.wikipedia.org/wiki/Jean_Grey",
//         authorId: "jean-gray",
//         length: "05:08",
//         category: "Mind Power"
//     },
//     {
//         id: "Never-Get-Hurt-Again",
//         title: "Never Get Hurt Again",
//         watchHref: "https://en.wikipedia.org/wiki/Wolverine_(character)",
//         authorId: "james-howlett",
//         length: "03:10",
//         category: "Badass"
//     },
//     {
//         id: "bending-steel",
//         title: "Bending Steel",
//         watchHref: "https://en.wikipedia.org/wiki/Magneto_(comics)",
//         authorId: "erik-magnus",
//         length: "02:52",
//         category: "First Class"
//     },
//     {
//         id: "fighting-global-warming",
//         title: "Fighting Global Warming",
//         watchHref: "https://en.wikipedia.org/wiki/Iceman_(comics)",
//         authorId: "bobby-drake",
//         length: "02:30",
//         category: "Basics"
//     },
//     {
//         id: "handling-heavy-traffic",
//         title: "Handling Heavy Traffic",
//         watchHref: "https://en.wikipedia.org/wiki/Nightcrawler_(comics)",
//         authorId: "kurt-wagner",
//         length: "05:10",
//         category: "Essential"
//     }
// ];
//
// function replaceAll(str, find, replace) {
//     return str.replace(new RegExp(find, 'g'), replace);
// }
//
// //This would be performed on the server in a real app. Just stubbing in.
// const generateId = (course) => {
//     return replaceAll(course.title, ' ', '-');
// };
//
// class CourseApi {
//     static getAllCourses() {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(Object.assign([], courses));
//             }, delay);
//         });
//     }
//
//     static getCourses(authorId) {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(Object.assign([], courses.filter(course => course.authorId == authorId)));
//             }, delay);
//         });
//     }
//
//     static saveCourse(course) {
//         course = Object.assign({}, course); // to avoid manipulating object passed in.
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 // Simulate server-side validation
//                 const minCourseTitleLength = 1;
//                 if (course.title.length < minCourseTitleLength) {
//                     reject(`Title must be at least ${minCourseTitleLength} characters.`);
//                 }
//
//                 if (course.id) {
//                     const existingCourseIndex = courses.findIndex(a => a.id == course.id);
//                     courses.splice(existingCourseIndex, 1, course);
//                 } else {
//                     //Just simulating creation here.
//                     //The server would generate ids and watchHref's for new courses in a real app.
//                     //Cloning so copy returned is passed by value rather than by reference.
//                     course.id = generateId(course);
//                     course.watchHref = `http://www.pluralsight.com/courses/${course.id}`;
//                     courses.push(course);
//                 }
//
//                 resolve(course);
//             }, delay);
//         });
//     }
//
//     static deleteCourse(courseId) {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 const indexOfCourseToDelete = courses.findIndex(course => course.id == courseId);
//                 courses.splice(indexOfCourseToDelete, 1);
//                 resolve();
//             }, delay);
//         });
//     }
// }
//
// export default CourseApi;
