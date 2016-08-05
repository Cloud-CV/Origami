import React from 'react';
import DocsContent from '../../stateless/webappgettingstarted';

function IO() {
  return (
    <DocsContent>
      <h1 className="ui header">
        Adding Input/Output components
      </h1>

      <div className="ui horizontal divider">
        <hr />
      </div>

      <div className="ui info compact message">
        <div className="header">
          The following procedure applies to both Input and Ouput components.
        </div>
      </div>

      <br />

      <div className="ui orange compact message">
        <h3 className="ui header">
          Step 1: Configuring the Input component
        </h3>
      </div>

      <ul className="list">
        <li>
          After registering the application, you are taken to the input component selection page.
        </li>
        <br />

        <li>
          Choose the kind of Input component your machine learning code requires.
          <ul className="list">
            <li>
              If your code requires processing 1 (or more) images, you need <b>Image Input</b> component.
            </li>
            <li>
              If it requires both an image and a text input with it, you need <b>Text Image Input</b> component and so on.
            </li>
          </ul>
        </li>
        <br />

        <li>
          After choosing the Input component of your choice, click on <b>Modify</b> button on the component you want.
          <ul className="list">
            <li>
              This opens the modification modal for that component. Each component can have different type of configuration.
            </li>
            <li>
              For example, <b>Text Input</b> component has an <b>Add Label</b> option that adds a new text field for input.
              <br />
              The text entered here appears in the placeholder for the field in the Input component on demo page.
            </li>
            <li>
              You can add or delete any number of fields in Input component.
            </li>
            <li>
              Press <b>OK</b> to save the component.
            </li>
          </ul>
        </li>
      </ul>

      <div className="ui orange compact message">
        <h3 className="ui header">
          Step 2: Previewing the Input component
        </h3>
      </div>

      <ul className="list">
        <li>
          After configuring the Input component, you can preview it by pressing the <b>Preview</b> button on the component.
        </li>
        <br />

        <li>
          This opens a modal that shows how the Input component will look like on the demo page.
        </li>
        <br />

        <li>
          If you are satisfied with the preview, you can click on <b>OK</b> and move to the next step.
          <br />
          Otherwise you can edit the Input component and see the preview again.
        </li>
      </ul>

      <div className="ui orange compact message">
        <h3 className="ui header">
          Step 3: Using the Input component
        </h3>
      </div>

      <ul className="list">
        <li>
          Once you are satisfied with the preview, you can press the <b>Use</b> button on the component to add
          <br />
          to the demo page.
        </li>
        <br />

        <li>
          You can come back to this page anytime from the user profile page by clicking on <b>Modify</b> on the project
          <br />
          and selecting <b>Input</b> thereafter.
        </li>
      </ul>

      <div className="ui yellow compact message">
        Refreshing the page or going back refreshes the app-state.
        <br />
        In that case, you have to go back to the Input component page from the user profile page by clicking <b>Modify</b>
        <br />
        and selecting <b>Input</b> thereafter.
      </div>

    </DocsContent>
  );
}

export default IO;
