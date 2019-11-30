import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Form from "./Form";
import Header from "./Header";
import Footer from "./Footer";


class Landing extends Component {

  
  render() {
    return (


      <main>
        <Header/> 
     
        <section className="intro">
            <h2>About Us</h2>
            <div className="col-sm-12">
             <h5>Indian cinema is the largest national film industry in terms of the number of films produced and the number of tickets sold, with 3.5 billion tickets sold worldwide annually.Having said that, If you are the person who has this passion for pursuing your career in Cinema. Either it may be on-screen like a Lead actor, actress, junior artist or off-screen Direction of Photography, Director, Playback Singer, Dance Choreographer, etc.. You might be located in many rural parts of India but we heard you. On the other hand, dear passionate Indian Movie Makers are you looking for some passionate, young, new talent and dedicated artists to showcase in your upcoming dream project? Yes, we heard you too.</h5>
            </div>
        </section>

        <div>
             <div className="services">
                <div className="service-one">
                <p className="service-icon"></p>
                <p className="service-title">Create your profile</p>
                <p>Add your headshots, reels and résumés to showcase your talent and get scouted by casting directors.</p>
                </div>
                <div className="service-two">
                <p className="service-icon"></p>
                <p className="service-title">Apply to Jobs</p>
                <p>Explore thousands of casting notices every day and find the perfect roles to advance your career, in real time.</p>
            
                </div>
                <div className="service-three">
                <p className="service-icon"></p>
                <p className="service-title">Land Auditions</p>
                <p>Apply, audition, land the part, and make your mark!</p>
              
          </div>
        </div>

            </div>

            <div className="gallery">
         <div className="gallery-item-one"></div>
         <div className="gallery-item-two"></div>
         <div className="gallery-item-three"></div>
         <div className="gallery-item-four"></div>
         <div className="gallery-item-five"></div>
         <div className="gallery-item-six"></div>

        </div>
        

        <section>
            <h2>Our Vision and Mission</h2>
            <div className="col-sm-10">
              <h5>Create opportunity for every member of the talent workforce. </h5>
              <h5>The mission of Tara is simple: connect the world’s talent seekers to talent and help to make them more productive and successful.</h5>
              </div>
        </section>



        <div class="row justify-content-between">
              <div class="col-lg-6 col-sm-12">
                <div  className="creators">
                  <h2>For Creators</h2>
                  <p class="main-desc">Tara makes it simple to cast the perfect talent for your project.</p>
                  <ul>
                    <li>
                      <h6>Post a Job</h6>
                      <p>Post a job and begin receiving submissions from performers instantly. Qualify by age, appearance, skills, and location.</p>
                    </li>
                    <li>
                      <h6>Manage Applications</h6>
                      <p>We've made the application process a breeze. Advanced tools to manage talent approval at lightning quick speeds.</p>
                    </li>
                    <li>
                      <h6>Find Talent for Your Project</h6>
                      <p>Search our Talent Database of over 100,000 talented performers. Reach out and invite them to apply to your project.</p>
                    </li>
                  </ul>
                  {/* <a href="/member-benefits/creators/" data-cta="product_home_cd_features_learn_more" data-subtype="learn_more" class="more-link cd-cta" id="learnMoreHome6" aria-label="Learn more about how Backstage works for creators">Learn more about creator tools</a> */}
                </div>
              </div>
              <div class="col-lg-6 col-sm-12">
                <div class="creators agents">
                  <h2>For Talents</h2>
                  <p class="main-desc">Tara's simple yet sophisticated platform makes managing your talent easier than ever.</p>
                  <ul>
                    <li>
                      <h6>Advanced Scheduling</h6>
                      <p>Easily manage your talent's audition schedule, communicate with CDs and get your actors booked.</p>
                    </li>
                    <li>
                      <h6>Submission Profile</h6>
                      <p>Build a dashboard for your entire roster, submit them to projects, and track their progress.</p>
                    </li>
                    <li>
                      <h6>Build Your Career</h6>
                      <p>Search our Job Database of over 100,000 active jobs to find the perfect addition to your roster.</p>
                    </li>
                  </ul>
                  {/* <a href="" data-toggle="modal" data-target="#agentsModal" data-cta="product_home_agent_features_learn_more" data-subtype="learn_more" class="more-link cd-cta" id="learnMoreHome7" aria-label="Learn more about how Backstage works for agents">Learn more about agent tools</a> */}
                </div>
              </div>
            </div>

       <Footer/>
      </main>
    );
  }
}

export default Landing;
