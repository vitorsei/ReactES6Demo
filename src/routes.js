import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "./components/App";
import HomePage from "./components/home/HomePage";
import AboutPage from "./components/about/AboutPage";
import CoursesPage from "./components/course/CoursesPage";
import NotFoundPage from "./components/notFound/NotFoundPage";
import ManageCoursePage from "./components/course/ManageCoursePage";
import ManageAuthorPage from "./components/author/ManageAuthorPage";
import AuthorPage from "./components/author/AuthorPage"; //eslint-disable-line import/no-named-as-default
//eslint-disable-line import/no-named-as-default


export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="courses" component={CoursesPage}/>
        <Route path="authors" component={AuthorPage}/>
        <Route path="course" component={ManageCoursePage}/>
        <Route path="course/:id" component={ManageCoursePage}/>
        <Route path="author" component={ManageAuthorPage}/>
        <Route path="author/:id" component={ManageAuthorPage}/>
        <Route path="about" component={AboutPage}/>
        <Route path="*" name="notFound" component={NotFoundPage}/>
    </Route>
);
