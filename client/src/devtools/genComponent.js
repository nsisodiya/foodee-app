const fs = require('fs');
const { promisify } = require('util');
const { paramCase } = require('change-case');
const { prompt } = require('enquirer');
const chalk = require('chalk');

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

async function main() {
  console.warn(
    chalk.red.bgYellow.bold(
      '                  Welcome to Component Generator                        \n'
    )
  );

  const response = await prompt({
    type: 'input',
    name: 'username',
    message: 'Please tell Component Name? Ex - PropertyCard'
  });
  if (response.username === '') {
    console.warn(chalk.red.bgWhite.bold(' Sorry, empty sring not allowed '));
    return;
  }
  const componentName = response.username;
  console.warn(
    chalk.blue.bgYellow.bold(
      `                  Generating ${componentName} Component                        \n`
    )
  );

  var compFileContent = `import React from 'react';
import css from 'css-template';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container } from './${componentName}.styled';
import { DisabledText } from '../../css/common.styled';
import { DevLinks } from '../DevLinks/DevLinks';

const mtop30 = css\`
  margin-top: 30px;
  margin-left: 30px;
\`;

// Open - http://localhost:1234/components/${paramCase(componentName)}
// Open - http://localhost:6006/?path=/story/components-${componentName.toLowerCase()}--normal

const filePath = \`/src/components/${componentName}/${componentName}.js\`;

export const ${componentName} = function ({ id }) {
  return (
    <Container data-file={filePath} style={mtop30} className='p-3 border bg-gray-100 rounded-lg'>
      <div className='p-1 color-green-600'>${componentName} {id}</div>
      <DisabledText>This text is Disabled</DisabledText>
      <DevLinks displayName={${componentName}.displayName} filePath={filePath} />
    </Container>
  );
};

${componentName}.displayName = '${componentName}';
${componentName}.testProps = [
  {
    id: 'xyz'
  }
];
${componentName}.propTypes = {
  id: PropTypes.string
};
`;

  const compFilePathsm = `/src/components/${componentName}/${componentName}.js`;
  const compFilePath = `${process.cwd()}${compFilePathsm}`;

  // fs.closeSync(fs.openSync(compFilePath, 'w'));

  const storyFileContent = `import React from 'react';
import { ${componentName} } from './${componentName}';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Components/${componentName}',
  component: ${componentName}
};

// Open - http://localhost:6006/?path=/story/components-${componentName.toLowerCase()}--normal

export const normal = () => <${componentName} />;
`;

  const storyFilePathsm = `/src/components/${componentName}/${componentName}.stories.js`;
  const storyFilePath = `${process.cwd()}${storyFilePathsm}`;

  const cssFilePathsm = `/src/components/${componentName}/${componentName}.styled.js`;
  const cssFilePath = `${process.cwd()}${cssFilePathsm}`;

  const cssFileContent = `import styled from 'styled-components';

export const Container = styled.div\`
  position: relative;
  width: 100%;
  height: 100%;
  background: white;
\`;
`;

  await mkdir(`${process.cwd()}/src/components/${componentName}/`, { recursive: true });
  await writeFile(compFilePath, compFileContent);
  await writeFile(storyFilePath, storyFileContent);
  await writeFile(cssFilePath, cssFileContent);
  console.warn(`File Created -> ${compFilePathsm}`);
  console.warn(`File Created -> ${storyFilePathsm}`);
  console.warn(`File Created -> ${cssFilePathsm}`);
  console.warn('\nAdd following code to src/components/index.js\n');
  console.warn(`import { ${componentName} } from './${componentName}/${componentName}';`);
  console.warn('===========================');
  console.warn('\nNow add following code to src/router/AppRouter.js\n');
  console.warn(`import { ${componentName} } from '../components';`);
  console.warn('===========================');
}

main().catch((error) => console.error(error));
