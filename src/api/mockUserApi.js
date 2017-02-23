// import delay from './delay';
//
// const users = [
//     {
//         id: "1",
//         name: "Vitor"
//     }
// ];
//
// class UserApi {
//     static getAllUsers() {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(Object.assign([], users));
//             }, delay);
//         });
//     }
//
//     static getUser(userId) {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 let user = users.find(user => user.id == userId);
//                 if (user)
//                     resolve(Object.assign([], user));
//                 else
//                     reject("Not found");
//             }, delay);
//         });
//     }
//
//
// }
//
// export default UserApi;