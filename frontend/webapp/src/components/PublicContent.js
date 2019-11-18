import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ErrorSharpIcon from '@material-ui/icons/ErrorSharp';
import ReplaySharpIcon from '@material-ui/icons/ReplaySharp';
import Fab from '@material-ui/core/Fab';
import Chip from '@material-ui/core/Chip';
import { IconContext } from "react-icons";
import { MdWork } from "react-icons/md";
import { MdFace } from "react-icons/md";
import { MdSchool } from "react-icons/md";
import { FaReact } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { FaCss3 } from "react-icons/fa";
import { FaSlack } from "react-icons/fa";
import { FaCloud } from "react-icons/fa";
import { GoCode } from "react-icons/go";
import { IoMdMedical } from "react-icons/io";
import { GiHouse } from "react-icons/gi";
import { DiPostgresql } from "react-icons/di";
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { GiScubaTanks } from "react-icons/gi";
import { IoMdBicycle } from "react-icons/io";
import { IoMdAirplane } from "react-icons/io";
import { MdComputer } from "react-icons/md";
import { MdMovieFilter } from "react-icons/md";
import { isBrowser, isMobile } from "react-device-detect";

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import {
  changePageState
} from '../actions/actionCreators';

var wordcloudImg = require("./static/wordcloud.jpg");

const mapStateToProps = state => {
  return {
    Main: state.Main,
    Account: state.Account
  }
}


const mapDispatchToProps = dispatch => ({
  changePageState: (state) => dispatch(changePageState(state)),
})

const styles = theme => ({
  componentRoot: {
    display: 'flex',
    flexGrow: 1,
  },
  mainPaper: {
    position: "relative",
    verticalAlign: 'top',
    top: 10,
    left: 0,
    right:10,
    bottom:10,
  },
});

class PublicContent extends Component {

  constructor(props) {
    super(props);
    this.renderWordcloud = this.renderWordcloud.bind(this)
    this.state = {
      showAlertButton:true
    }
  }


  renderWordcloud() {
    if (isBrowser) {
      return(<img src={wordcloudImg} />);
    } else {
      return(<span></span>);
    }
  }

  renderName() {
    if (isBrowser) {
      return(
        <Typography variant="h1" align="center">
          jonathan_porter
        </Typography>
      );
    } else {
      return(
        <Typography variant="h1" align="center">
          jonathan porter
        </Typography>
      );
    }
  }


  render() {
    const { classes } = this.props;
    const elev = 2;

    return (
      <div className={classes.componentRoot}>
        <Container maxWidth='xl' style={{ background: '#e1e2e1' }}>
          <Grid container className={classes.componentRoot} spacing={3}>
            <Grid item container xs={12} spacing={1}>
              <Grid item xs={12}>
                <Box m={0.5} p={4} />
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={1}>
              <Grid item xs={12}>
                {this.renderName()}
                <Box m={1} p={1} />
                <Typography variant="h5" align="center">
                  {this.renderWordcloud()}
                </Typography>
                <Box m={1} p={1} />
                <Typography variant="h4" align="center">
                  <u>projects and experience</u>
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={1}>
              <Grid item xs={12}>
                <VerticalTimeline>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    //contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    //contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    date="october 2019 - present"
                    iconStyle={{ background: 'rgb(97,219,251)', color: '#fff' }}
                    icon={<FaReact />}
                  >
                    <h3 className="vertical-timeline-element-title"><u>react/python client portal app</u></h3>
                    <h4 className="vertical-timeline-element-subtitle">independent - atlanta, ga</h4>
                    <p>
                      developed customer portal to more effectively communicate project information with my clients
                    </p>
                    <br />
                    <Chip label="python" />
                    &nbsp;
                    <Chip label="django" />
                    &nbsp;
                    <Chip label="reactjs" />
                    &nbsp;
                    <Chip label="redux" />
                    &nbsp;
                    <Chip label="material-ui" />
                    &nbsp;
                    <Chip label="custom server" />
                  </VerticalTimelineElement>

                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    //contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    //contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    date="june  2019 - present"
                    iconStyle={{ background: 'rgb(97,219,251)', color: '#fff' }}
                    icon={<FaReact />}
                  >
                    <h3 className="vertical-timeline-element-title"><u>react/python data visualization app</u></h3>
                    <h4 className="vertical-timeline-element-subtitle">SCApath - atlanta, ga</h4>
                    <p>
                      architected and developed cloud-native tool to analyze and visualize big data
                    </p>
                    <br />
                    <Chip label="python" />
                    &nbsp;
                    <Chip label="django" />
                    &nbsp;
                    <Chip label="reactjs" />
                    &nbsp;
                    <Chip label="redux" />
                    &nbsp;
                    <Chip label="material-ui" />
                    &nbsp;
                    <Chip label="google charts" />
                    &nbsp;
                    <Chip label="gcp" />
                  </VerticalTimelineElement>

                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    //contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    //contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    date="august 2018 - june 2019"
                    iconStyle={{ background: 'rgb(254,202,58)', color: '#fff' }}
                    icon={<FaPython />}
                  >
                    <h3 className="vertical-timeline-element-title"><u>python/django file generation app</u></h3>
                    <h4 className="vertical-timeline-element-subtitle">SCApath - atlanta, ga</h4>
                    <p>
                      designed and coded cloud-based app to automate the creation of test data, iteratively working with client to meet dynamic requirements
                    </p>
                    <br />
                    <Chip label="python" />
                    &nbsp;
                    <Chip label="django" />
                    &nbsp;
                    <Chip label="django templates" />
                    &nbsp;
                    <Chip label="aws" />
                  </VerticalTimelineElement>

                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    //contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    //contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    date="august 2018 - july 2019"
                    iconStyle={{ background: 'rgb(255,0,0)', color: '#fff' }}
                    icon={<FaDatabase />}

                  >
                    <h3 className="vertical-timeline-element-title"><u>quality systems sql development</u></h3>
                    <h4 className="vertical-timeline-element-subtitle">SCApath - atlanta, ga</h4>
                    <p>
                      helped client design quality system with multiple highly complex custom sql reports
                    </p>
                    <br />
                    <Chip label="oracle pl/sql" />
                  </VerticalTimelineElement>

                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    //contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    //contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    date="july 2018 - april 2019"
                    iconStyle={{ background: 'rgb(255,0,0)', color: '#fff' }}
                    icon={<FaDatabase />}
                  >
                    <h3 className="vertical-timeline-element-title"><u>custom oracle pl/sql development</u></h3>
                    <h4 className="vertical-timeline-element-subtitle">SCApath - atlanta, ga</h4>
                    <p>
                      formulated and wrote custom oracle procedural sql to achieve client's desired functionality
                    </p>
                    <br />
                    <Chip label="pl/sql triggers" />
                    &nbsp;
                    <Chip label="pl/sql stored procedures" />
                  </VerticalTimelineElement>

                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="april 2018 - september 2018"
                    iconStyle={{ background: 'rgb(10,27,101)', color: '#fff' }}
                    icon={<IoMdMedical />}
                  >
                    <h3 className="vertical-timeline-element-title"><u>medical device logistics tracking app</u></h3>
                    <h4 className="vertical-timeline-element-subtitle">independent - atlanta, ga</h4>
                    <p>
                      full functional and techincal design of new blockchain tool for a client in the medial device industry
                    </p>
                    <br />
                    <Chip label="user stories" />
                    &nbsp;
                    <Chip label="functional specs" />
                    &nbsp;
                    <Chip label="technical architecture" />
                    &nbsp;
                    <Chip label="integration design" />
                  </VerticalTimelineElement>

                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="march 2018 - may 2018"
                    iconStyle={{ background: 'rgb(254,202,58)', color: '#fff' }}
                    icon={<FaPython />}
                  >
                    <h3 className="vertical-timeline-element-title"><u>time tracking and invoicing slack app</u></h3>
                    <h4 className="vertical-timeline-element-subtitle">independent - atlanta, ga</h4>
                    <p>
                      built a slack app to more easily track hours spent and automatically invoice clients
                    </p>
                    <br />
                    <Chip label="python" />
                    &nbsp;
                    <Chip label="django" />
                    &nbsp;
                    <Chip label="slack api" />
                    &nbsp;
                    <Chip label="aws" />
                  </VerticalTimelineElement>

                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="december 2017 - march 2018"
                    iconStyle={{ background: 'rgb(49,97,146)', color: '#fff' }}
                    icon={<FaDatabase />}
                  >
                    <h3 className="vertical-timeline-element-title"><u>pharmaceutical data warehouse development</u></h3>
                    <h4 className="vertical-timeline-element-subtitle">AnswerRocket - atlanta, ga</h4>
                    <p>
                      designed full data model for highly complex data warehouse of a pharmaceutical client
                    </p>
                    <br />
                    <Chip label="kimball dimensional modeling techniques" />
                  </VerticalTimelineElement>

                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="september 2017 - march 2018"
                    iconStyle={{ background: 'rgb(49,97,146)', color: '#fff' }}
                    icon={<FaDatabase />}
                  >
                    <h3 className="vertical-timeline-element-title"><u>sales engineering data warehouse design</u></h3>
                    <h4 className="vertical-timeline-element-subtitle">AnswerRocket - atlanta, ga</h4>
                    <p>
                      developed over twenty data warehouses for proof of concept deployments to assist sales team
                    </p>
                    <br />
                    <Chip label="kimball dimensional modeling techniques" />
                  </VerticalTimelineElement>

                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="september 2017 - december 2018"
                    iconStyle={{ background: 'rgb(27,115,186)', color: '#fff' }}
                    icon={<FaCss3 />}
                  >
                    <h3 className="vertical-timeline-element-title"><u>whitelabeling rearchitecting</u></h3>
                    <h4 className="vertical-timeline-element-subtitle">AnswerRocket - atlanta, ga</h4>
                    <p>
                      refactored code and internal process to reduce whitelabeling development time from three days per deployment to less than one hour
                    </p>
                    <br />
                    <Chip label="python" />
                    &nbsp;
                    <Chip label="css" />
                  </VerticalTimelineElement>

                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="june 2015 - august 2017"
                    iconStyle={{ background: 'rgb(7,29,73)', color: '#fff' }}
                    icon={<MdWork />}
                  >
                    <h3 className="vertical-timeline-element-title"><u>wmos consultant</u></h3>
                    <h4 className="vertical-timeline-element-subtitle">Manhattan Associates - atlanta, ga</h4>
                    <p>
                      functional lead on two long-term wms projects, designing over fifteen different software modifications between the two
                    </p>
                    <p>
                      gathered business requirements from clients and designed technical logic for development team
                    </p>
                  </VerticalTimelineElement>

                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="august 2011 - august 2013"
                    iconStyle={{ background: 'rgb(238,28,37)', color: '#fff' }}
                    icon={<MdWork />}
                  >
                    <h3 className="vertical-timeline-element-title"><u>industrial engineering co-op</u></h3>
                    <h4 className="vertical-timeline-element-subtitle">Robert Bosch, LLC - charleston, sc</h4>
                    <p>
                      worked on continuous improvement projects in a large scale automotive manufacturing setting
                    </p>
                  </VerticalTimelineElement>

                  <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="august 2010 - may 2015"
                    iconStyle={{ background: 'rgb(51,51,51)', color: '#fff' }}
                    icon={<MdSchool />}
                  >
                    <h3 className="vertical-timeline-element-title"><u>bachelor of science in industrial and systems engineering</u></h3>
                    <h4 className="vertical-timeline-element-subtitle">Georgia Institute of Technology - atlanta, ga</h4>
                    <p>
                      minor in engineering & business through the denning technology and management program
                    </p>
                    <p>
                      graduated with highest honors
                    </p>
                  </VerticalTimelineElement>

                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="june 2007 - may 2015"
                    iconStyle={{ background: 'rgb(109,27,123)', color: '#fff' }}
                    icon={<MdWork />}
                  >
                    <h3 className="vertical-timeline-element-title"><u>entrepreneur (part-time)</u></h3>
                    <h4 className="vertical-timeline-element-subtitle">Premises, Inc. - tucker, ga</h4>
                    <p>
                      collaboratively understood business needs from local real estate agents
                    </p>
                    <p>
                      created promotional websites, marketing flyers, and information brochures to increase buyer traffic
                    </p>
                  </VerticalTimelineElement>

                  <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="august 2006 - may 2010"
                    iconStyle={{ background: 'rgb(51,51,51)', color: '#fff' }}
                    icon={<MdSchool />}
                  >
                    <h3 className="vertical-timeline-element-title">st. piux x high school</h3>
                    <h4 className="vertical-timeline-element-subtitle">atlanta, ga</h4>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="august 2004 - may 2006"
                    iconStyle={{ background: 'rgb(51,51,51)', color: '#fff' }}
                    icon={<MdSchool />}
                  >
                    <h3 className="vertical-timeline-element-title">arbor montessori middle school</h3>
                    <h4 className="vertical-timeline-element-subtitle">decatur, ga</h4>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="august 1995 - may 2004"
                    iconStyle={{ background: 'rgb(51,51,51)', color: '#fff' }}
                    icon={<MdSchool />}
                  >
                    <h3 className="vertical-timeline-element-title">northwoods montessori elementary school</h3>
                    <h4 className="vertical-timeline-element-subtitle">atlanta, ga</h4>
                  </VerticalTimelineElement>

                  <VerticalTimelineElement
                    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                    icon={<MdFace />}
                    date="hello world: july 1992"
                  />
                </VerticalTimeline>
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={1}>
              <Grid item xs={12}>
                <Box m={1} p={2} />
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={1} align="center" justify="center" direction="column">
              <Grid item xs={12}>
                <Typography variant="h4" align="center">
                  <u>skills</u>
                </Typography>
                <Box m={1} p={1} />
                <Grid container spacing={3} align="center" justify="center">
                  <Grid item>
                    <Flippy
                      flipOnHover={true} // default false
                      flipOnClick={false} // default false
                      flipDirection="horizontal" // horizontal or vertical
                      ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                      // if you pass isFlipped prop component will be controlled component.
                      // and other props, which will go to div
                      style={{ width: '200px', height: '200px' }} /// these are optional style, it is not necessary
                    >
                      <FrontSide style={{ backgroundColor: '#ffc107', color: '#333333', fontSize: '24px' }} >
                        <Box p={1} />
                        <IconContext.Provider value={{ size: "3em" }}>
                          <div>
                            <FaPython />
                          </div>
                        </IconContext.Provider>
                        <b>python</b>
                      </FrontSide>
                      <BackSide style={{ backgroundColor: '#333333', color: '#ffc107', fontSize: '24px' }}>
                        <b>django<br />drf</b>
                      </BackSide>
                    </Flippy>
                  </Grid>
                  <Grid item>
                    <Flippy
                      flipOnHover={true} // default false
                      flipOnClick={false} // default false
                      flipDirection="horizontal" // horizontal or vertical
                      ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                      // if you pass isFlipped prop component will be controlled component.
                      // and other props, which will go to div
                      style={{ width: '200px', height: '200px' }} /// these are optional style, it is not necessary
                    >
                      <FrontSide style={{ backgroundColor: '#ffc107', color: '#333333', fontSize: '24px' }} >
                        <Box p={1} />
                        <IconContext.Provider value={{ size: "3em" }}>
                          <div>
                            <FaReact />
                          </div>
                        </IconContext.Provider>
                        <b>reactjs</b>
                      </FrontSide>
                      <BackSide style={{ backgroundColor: '#333333', color: '#ffc107', fontSize: '24px' }}>
                        <b>redux<br />material-ui</b>
                      </BackSide>
                    </Flippy>
                  </Grid>
                  <Grid item>
                    <Flippy
                      flipOnHover={true} // default false
                      flipOnClick={false} // default false
                      flipDirection="horizontal" // horizontal or vertical
                      ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                      // if you pass isFlipped prop component will be controlled component.
                      // and other props, which will go to div
                      style={{ width: '200px', height: '200px' }} /// these are optional style, it is not necessary
                    >
                      <FrontSide style={{ backgroundColor: '#ffc107', color: '#333333', fontSize: '24px' }} >
                        <Box p={1} />
                        <IconContext.Provider value={{ size: "3em" }}>
                          <div>
                            <FaDatabase />
                          </div>
                        </IconContext.Provider>
                        <b>sql</b>
                      </FrontSide>
                      <BackSide style={{ backgroundColor: '#333333', color: '#ffc107', fontSize: '24px' }}>
                        <b>postgresql<br />oracle pl/sql</b>
                      </BackSide>
                    </Flippy>
                  </Grid>
                  <Grid item>
                    <Flippy
                      flipOnHover={true} // default false
                      flipOnClick={false} // default false
                      flipDirection="horizontal" // horizontal or vertical
                      ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                      // if you pass isFlipped prop component will be controlled component.
                      // and other props, which will go to div
                      style={{ width: '200px', height: '200px' }} /// these are optional style, it is not necessary
                    >
                      <FrontSide style={{ backgroundColor: '#ffc107', color: '#333333', fontSize: '24px' }} >
                        <IconContext.Provider value={{ size: "3em" }}>
                          <div>
                            <FaCloud />
                          </div>
                        </IconContext.Provider>
                        <b>cloud platforms</b>
                      </FrontSide>
                      <BackSide style={{ backgroundColor: '#333333', color: '#ffc107', fontSize: '24px' }}>
                        <b>aws<br />gcp</b>
                      </BackSide>
                    </Flippy>
                  </Grid>
                  <Grid item>
                    <Flippy
                      flipOnHover={true} // default false
                      flipOnClick={false} // default false
                      flipDirection="horizontal" // horizontal or vertical
                      ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                      // if you pass isFlipped prop component will be controlled component.
                      // and other props, which will go to div
                      style={{ width: '200px', height: '200px' }} /// these are optional style, it is not necessary
                    >
                      <FrontSide style={{ backgroundColor: '#ffc107', color: '#333333', fontSize: '24px' }} >
                        <IconContext.Provider value={{ size: "3em" }}>
                          <div>
                            <GoCode />
                          </div>
                        </IconContext.Provider>
                        <b>markup languages</b>
                      </FrontSide>
                      <BackSide style={{ backgroundColor: '#333333', color: '#ffc107', fontSize: '24px' }}>
                        <b>xml<br />json<br />css<br />html</b>
                      </BackSide>
                    </Flippy>
                  </Grid>
                </Grid>
                
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={1}>
              <Grid item xs={12}>
                <Box m={1} p={1} />
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={1} align="center" justify="center" direction="column">
              <Grid item xs={12}>
                <Typography variant="h4" align="center">
                  <u>interests</u>
                </Typography>
                <Box m={1} p={1} />
                <Grid container spacing={3} align="center" justify="center">
                  <Grid item>
                    <Flippy
                      flipOnHover={true} // default false
                      flipOnClick={false} // default false
                      flipDirection="horizontal" // horizontal or vertical
                      ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                      // if you pass isFlipped prop component will be controlled component.
                      // and other props, which will go to div
                      style={{ width: '200px', height: '200px' }} /// these are optional style, it is not necessary
                    >
                      <FrontSide style={{ backgroundColor: '#333333', color: '#ffc107', fontSize: '24px' }} >
                        <Box p={1} />
                        <IconContext.Provider value={{ size: "3em" }}>
                          <div>
                            <GiScubaTanks />
                          </div>
                        </IconContext.Provider>
                        <b>scuba</b>
                      </FrontSide>
                      <BackSide style={{ backgroundColor: '#ffc107', color: '#333333', fontSize: '24px' }}>
                        <b>open water since 2005<br />nitrox since 2016</b>
                      </BackSide>
                    </Flippy>
                  </Grid>
                  <Grid item>
                    <Flippy
                      flipOnHover={true} // default false
                      flipOnClick={false} // default false
                      flipDirection="horizontal" // horizontal or vertical
                      ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                      // if you pass isFlipped prop component will be controlled component.
                      // and other props, which will go to div
                      style={{ width: '200px', height: '200px' }} /// these are optional style, it is not necessary
                    >
                      <FrontSide style={{ backgroundColor: '#333333', color: '#ffc107', fontSize: '24px' }} >
                        <Box p={1} />
                        <IconContext.Provider value={{ size: "3em" }}>
                          <div>
                            <IoMdBicycle />
                          </div>
                        </IconContext.Provider>
                        <b>cycling</b>
                      </FrontSide>
                      <BackSide style={{ backgroundColor: '#ffc107', color: '#333333', fontSize: '24px' }}>
                        <b>trek fx3<br />disc rage</b>
                      </BackSide>
                    </Flippy>
                  </Grid>
                  <Grid item>
                    <Flippy
                      flipOnHover={true} // default false
                      flipOnClick={false} // default false
                      flipDirection="horizontal" // horizontal or vertical
                      ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                      // if you pass isFlipped prop component will be controlled component.
                      // and other props, which will go to div
                      style={{ width: '200px', height: '200px' }} /// these are optional style, it is not necessary
                    >
                      <FrontSide style={{ backgroundColor: '#333333', color: '#ffc107', fontSize: '24px' }} >
                        <Box p={1} />
                        <IconContext.Provider value={{ size: "3em" }}>
                          <div>
                            <IoMdAirplane />
                          </div>
                        </IconContext.Provider>
                        <b>travel</b>
                      </FrontSide>
                      <BackSide style={{ backgroundColor: '#ffc107', color: '#333333', fontSize: '24px' }}>
                        <b>prague<br />munich<br />lauterbrunnen<br />stockholm</b>
                      </BackSide>
                    </Flippy>
                  </Grid>
                  <Grid item>
                    <Flippy
                      flipOnHover={true} // default false
                      flipOnClick={false} // default false
                      flipDirection="horizontal" // horizontal or vertical
                      ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                      // if you pass isFlipped prop component will be controlled component.
                      // and other props, which will go to div
                      style={{ width: '200px', height: '200px' }} /// these are optional style, it is not necessary
                    >
                      <FrontSide style={{ backgroundColor: '#333333', color: '#ffc107', fontSize: '24px' }} >
                        <IconContext.Provider value={{ size: "3em" }}>
                          <div>
                            <MdComputer />
                          </div>
                        </IconContext.Provider>
                        <b>building computers</b>
                      </FrontSide>
                      <BackSide style={{ backgroundColor: '#ffc107', color: '#333333', fontSize: '24px' }}>
                        <b>asus z170-e, rtx 2070 8gb, intel i7-6700k</b>
                      </BackSide>
                    </Flippy>
                  </Grid>
                  <Grid item>
                    <Flippy
                      flipOnHover={true} // default false
                      flipOnClick={false} // default false
                      flipDirection="horizontal" // horizontal or vertical
                      ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                      // if you pass isFlipped prop component will be controlled component.
                      // and other props, which will go to div
                      style={{ width: '200px', height: '200px' }} /// these are optional style, it is not necessary
                    >
                      <FrontSide style={{ backgroundColor: '#333333', color: '#ffc107', fontSize: '24px' }} >
                        <IconContext.Provider value={{ size: "3em" }}>
                          <div>
                            <MdMovieFilter />
                          </div>
                        </IconContext.Provider>
                        <b>movies and<br />tv shows</b>
                      </FrontSide>
                      <BackSide style={{ backgroundColor: '#ffc107', color: '#333333', fontSize: '24px' }}>
                        <b>westworld<br />game/thrones<br />mr robot<br />silicon valley</b>
                      </BackSide>
                    </Flippy>
                  </Grid>
                </Grid>
                
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={1}>
              <Grid item xs={12}>
                <Box m={1} p={6} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }

}

PublicContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PublicContent));