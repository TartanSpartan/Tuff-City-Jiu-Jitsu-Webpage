import React from "react";
import Card from "react-bootstrap/Card"
import CardGroup from "react-bootstrap/Card"
import club_pic_sans_seumas_selina_in_gi from '../img/club_pic_sans_seumas_selina_in_gi.jpg'
import seumas_casual from '../img/seumas_casual.jpg'
import seumas_training from '../img/seumas_training.jpg'
import david_teaching from '../img/david_teaching.jpg'
import david_casual from '../img/david_casual.jpg'



export class WhoAreWe extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    render() {
      return (
        <Card style={{backgroundColor: "gray", color: "white"}}>
          <Card.Header id="capitalised-header" style={{textTransform: 'uppercase'}}>Who Are We?</Card.Header>
          <br />
          <img src={club_pic_sans_seumas_selina_in_gi} alt="clubpic"></img>

          <Card.Text style={{paddingLeft: 15, paddingRight: 15, fontSize: 14}} >
          <br />
<br />
            We are the world's westernmost Shorinji Kan Jiu Jitsu club!
            Our instructors hail from the United Kingdom but have come to
            British Columbia to share their passion for jiu jitsu's ability
            to empower self defence within the district of Tofino. They are
            co-equals and both bring their individual experiences and
            skillsets to the table as leaders. We already have a handful of
            earnest beginners and can't wait to help drive them forward in
            their journey towards better and better belts. We warmly welcome
            more of the community to join the club and become confident not
            just in violent situations but more broadly in life, too. The
            COVID-19 pandemic has unfortunately limited what we can do in
            training for the time being, but as we reopen we hope to reach
            a point where masks will no longer be necessary and where we may
            gather closely together to throw each other around and perform
            some cool locks, ground fighting bouts or whatever takes our
            fancy! Outside of the dojo, we are also looking forward to having
            some fun recreational and social activities to help underline our
            place as a vital component of the local community with the virus
            becoming a distant memory.
            </Card.Text>

              <Card.Header id="capitalised-header" style={{backgroundColor: "gray", textTransform: 'uppercase'}}>Seumas Finlayson Sempai</Card.Header>

            <CardGroup style={{display: 'flex', flexDirection: 'row'}}>
                
  <Card style={{backgroundColor: "gray", flex: 1}}>
    <Card.Body>
    <img src={seumas_training} alt="seumastraining" className="photo"></img>

    </Card.Body>

  </Card>

  <Card style={{backgroundColor: "gray", flex: 1}}>
    <Card.Body>
    <img src={seumas_casual} alt="seumascasual" className="photo"></img>

    </Card.Body>

  </Card>
</CardGroup>
<Card.Text style={{paddingLeft: 15, paddingRight: 15, fontSize: 14}} >

<br />
<br />
Seumas started training in 2007 under Bruce Davies, Colin Armstrong
and Ian Lambert in Edinburgh, Scotland. He was drawn to the art
by it's dramatic depiction in films and video games, and was
interested in learning an effective martial art when he came to
study physics as an undergraduate. The city's clubs were very
welcoming with a mantra of "train hard, then play hard" and the
friendships he made there, nationally and across the globe ever
since will stay with him for life. He steadily climbed up the
grades despite a few setbacks and attained dark blue belt by the
time he had graduated. Next up was a stint training in Reading
during a Masters degree, and then in South West England for work,
serving as a sempai or senior mentor in these clubs. However he
was soon drawn back to his roots in Edinburgh and started
intensive training for brown belt, which he achieved in December,
2016. Since then he did some help teaching in the city but was
aching for a chance to take up more responsibilities, and such
opportunities were hard to find in such a talent-rich and
competitive environment. Always drawn to Canada, he connected
with David and resolved to come to work in Tofino and help run
the club. He managed this at the end of September 2020 despite
COVID's best efforts!
<br />
<br />
Even with only one training session in the books before another
wave of the virus had the district's sports shut down again, he
was happy to be part of the scene and eager to help develop the 
club into a flourishing dojo with several keen members. His short
term goals include grading the two resident novices to yellow
belt and David up to light blue belt. Long term he hopes to get a
good pool of new members who will become both proficient in self
defence and willing to oblige the senior members in dishing out
tough beatings to hone them up for subsequent gradings, and to
foster good links with the Kilarney, Vancouver club and those
further afield. A fond participant of the triennial Internationa
event, he has been present for it in Edinburgh, then in
Collingwood, Ontario, Canada, and most recently in Drakensberg,
South Africa. It's one of his earnest wishes that he'll be able
to attend the next event in Vienna, Austria, with the virus
hopefully more or less eradicated by then.
<br />
<br />
One of Seumas' major goals in creating this website was to provide
an easily searchable syllabus document, not just for students but
also with a view to allow foreign instructors such as himself to 
better understand the Canadian version, which is quite similar to
the UK version but does differ in several key ways with specific
techniques and ordering through the belt grades. He also hopes that
students will engage with it and comment on any techniques they like
or have difficulty with in particular.
<br />
<br />
</Card.Text>
            
<Card.Header id="capitalised-header" style={{backgroundColor: "gray", textTransform: 'uppercase'}}>David Corbett Sempai</Card.Header>

<CardGroup style={{display: 'flex', flexDirection: 'row'}}>
    
<Card style={{backgroundColor: "gray", flex: 1}}>
<Card.Body>
<img src={david_teaching} alt="davidteaching" className="photo"></img>

</Card.Body>

</Card>

<Card style={{backgroundColor: "gray", flex: 1}}>
<Card.Body>
<img src={david_casual} alt="davidcasual" className="photo"></img>

</Card.Body>

</Card>
</CardGroup>
<Card.Text style={{paddingLeft: 15, paddingRight: 15, fontSize: 14}} >

<br />
<br />
David began his Jitsu career under Max Bauer Sensei in 2013 at University
College Birmingham, England, enjoying his eventual stint as a committee 
captain for the club. He first came to Tofino in 2015 but quickly found
there were no Shorinji Kan clubs in the local area with the closest
being in Vancouver. To make up for this absence, he trained at the Tofino
judo club whenever the opportunity presented itself. On a return to England
in June 2017, he got back into Jitsu training with a lot of passion, 3-4
times a week on average. He helped to teach a local Birmingham club and
achieved his purple belt and Club Instructor qualification.


<br />
<br />
He was grateful for other instructors who helped him get there including
James Owen, Eric Lau and Paul Glieboska of University of Birmingham and
Aston University, and perhaps foremost so with the assistance of Pristen 
Sibanda. Back in Tofino again, and now a permanent resident of
Canada, David founded the Tuff City Jitsu club. He's very proud of this and
also his students who regularly come to learn about the martial art. He
couldn't be more keen to get training resumed in a safe and welcoming
fashion, and is delighted to see enduring interest during the closure
amongst like-minded newbies in the community. His other interests include
hiking, running a YouTube channel revolving around the outdoors, working 
as a hotelier and the district of Tofino in general. David is very enthusiastic
about working with Seumas as a fellow instructor, with Seumas serving as a
mentor to help him achieve the final few coloured belt grades and to develop
the club in general.
<br />
<br />
</Card.Text>
            
        </Card>




        );
    }
}