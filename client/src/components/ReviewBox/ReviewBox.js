import React from 'react';
import css from 'css-template';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ta from 'time-ago';
import Rate from 'antd/es/rate';
import { DevLinks } from '../DevLinks/DevLinks';
import { Rows, Columns, ColSpacer, RowSpacer } from '../../css/Layout';

const { Container, Author, Visit, Comment } = {
  Container: styled.div`
    position: relative;
    width: 558px;
    background: white;
    padding: 14px;
    border-radius: 5px;
  `,
  Author: styled.span`
    font-size: 16px;
    line-height: 24px;
    color: #363636;
    font-weight: 500;
  `,
  Visit: styled.span`
    font-size: 14px;
    line-height: 21px;
    color: #9c9c9c;
  `,
  Comment: styled.span`
    font-size: 16px;
    font-weight: 300;
    line-height: 24px;
    color: #696969;
  `
};

const styles = {
  imagebox: css`
    width: 44px;
    height: 44px;
    border: 1px solid lightgray;
    border-radius: 22px;
    overflow: hidden;
  `,
  img: css`
    max-width: max-content;
    height: 100%;
  `
};
// Open - http://localhost:1234/components/review-box
// Open - http://localhost:6006/?path=/story/components-reviewbox--normal

const filePath = `/src/components/ReviewBox/ReviewBox.js`;

export const ReviewBox = function ({ avatarurl, author, rating, comment, visitDate }) {
  return (
    <Container data-file={filePath}>
      <Rows>
        <Columns>
          <div style={styles.imagebox}>
            <img style={styles.img} src={avatarurl} />
          </div>
          <ColSpacer>10</ColSpacer>
          <Rows>
            <Author>{author}</Author>
            <Visit>{ta.ago(visitDate)}</Visit>
          </Rows>
        </Columns>
        <Rate
          disabled
          style={css`
            color: red;
          `}
          value={rating}
        />
        <RowSpacer>20</RowSpacer>
        <Comment>{comment}</Comment>
      </Rows>
      <DevLinks displayName={ReviewBox.displayName} filePath={filePath} />
    </Container>
  );
};

ReviewBox.displayName = 'ReviewBox';
ReviewBox.testProps = [
  {
    avatarurl: 'https://robohash.org/eligendivoluptatemillo.png?size=50x50&set=set1',
    author: 'Tynan Matt',
    visitDate: 1584323326683,
    comment:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    rating: 5
  },
  {
    avatarurl: '',
    author: 'Gram Pariso',
    visitDate: 1592455021400,
    comment:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    rating: 2
  },
  {
    avatarurl: null,
    author: 'Huey Symonds',
    visitDate: 1588218206468,
    comment:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    rating: 4
  },
  {
    avatarurl: 'https://robohash.org/eumanimideleniti.png?size=50x50&set=set1',
    author: 'Beret Burgen',
    visitDate: 1593535454809,
    comment:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    rating: 2
  },
  {
    avatarurl: 'https://robohash.org/ducimusexpeditaeum.png?size=50x50&set=set1',
    author: 'Aleda Josovich',
    visitDate: 1590023110668,
    comment:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    rating: 5
  },
  {
    avatarurl: 'https://robohash.org/autcommodiet.png?size=50x50&set=set1',
    author: 'Kalvin Royle',
    visitDate: 1588076555495,
    comment:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    rating: 2
  },
  {
    avatarurl: 'https://robohash.org/undedoloreullam.png?size=50x50&set=set1',
    author: 'Claudian Ferrieri',
    visitDate: 1592374419083,
    comment: 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    rating: 4
  },
  {
    avatarurl: 'https://robohash.org/eainventoremaxime.png?size=50x50&set=set1',
    author: 'Kristi Merida',
    visitDate: 1586187878860,
    comment:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    rating: 4
  },
  {
    avatarurl: 'https://robohash.org/indelectusex.png?size=50x50&set=set1',
    author: 'Edgar True',
    visitDate: 1595269715526,
    comment: 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    rating: 4
  },
  {
    avatarurl: 'https://robohash.org/aliasidaperiam.png?size=50x50&set=set1',
    author: 'Osbourne Creane',
    visitDate: 1580725507444,
    comment:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    rating: 3
  }
];
ReviewBox.propTypes = {
  avatarurl: PropTypes.string,
  author: PropTypes.string,
  rating: PropTypes.number,
  comment: PropTypes.string,
  visitDate: PropTypes.number
};
