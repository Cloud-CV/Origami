import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const goBack = () => window.history.back();
const goToHomepage = () => (window.location = "/home");

const styles = theme => ({
  card: {
    display: "flex"
  },
  error: {
      paddingLeft: "10px",
      paddingTop: "15px",
      height: "100%"
  },
  title: {
    color: "black"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  actions: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }
});

function PageNotfoundHandler(props) {
  const { classes, theme } = props;

  return (
    <Card className={classes.card}>
      <Typography
        variant="display3"
        color="error"
        className={classes.error}
        gutterBottom
      >
        404
      </Typography>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography
            variant="display1"
            color="default"
            className={classes.title}
            gutterBottom
          >
            Page not found :(
          </Typography>
          <Typography variant="body1" gutterBottom>
            The page you are looking for may have been removed, or you typed in
            the wrong URL.
            If the issue persists, feel free to <a href="https://github.com/Cloud-CV/Origami/issues/new">file an issue</a> or <a href="https://gitter.im/Cloud-CV/Origami">ping us on Gitter</a>.
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button size="medium" color="primary" onClick={goBack}>
            Go back
          </Button>
          <Button size="medium" color="primary" onClick={goToHomepage}>
            Go to homepage
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}

PageNotfoundHandler.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PageNotfoundHandler);
