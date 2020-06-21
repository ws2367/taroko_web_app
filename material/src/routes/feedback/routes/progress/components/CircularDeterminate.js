import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class CircularDeterminate extends React.Component {
  timer = null;

  state = {
    completed: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <CircularProgress
          className={classes.progress}
          variant="determinate"
          value={this.state.completed}
        />
        <CircularProgress
          className={classes.progress}
          variant="determinate"
          size={50}
          value={this.state.completed}
        />
        <CircularProgress
          className={classes.progress}
          color="secondary"
          variant="determinate"
          value={this.state.completed}
        />
        <CircularProgress
          className={classes.progress}
          color="secondary"
          variant="determinate"
          size={50}
          value={this.state.completed}
        />
      </div>
    );
  }
}

CircularDeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

const CircularDeterminate1 = withStyles(styles)(CircularDeterminate);

const Section = () => (
  <article className="article">
    <div className="article-title-v2">Circular Determinate <span className="triangle triangle-down"></span></div>
    <CircularDeterminate1 />
  </article>
)

export default Section;
