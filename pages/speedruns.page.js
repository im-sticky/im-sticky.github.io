import React, {useEffect} from 'react';
import Gorgon from '@gorgonjs/gorgon';
import {PageHead} from 'components/PageHead';
import {Section} from 'components/Section';
import {Container} from 'components/Container';

export default function Speedruns() {
  useEffect(() => {
    Gorgon.get(
      'test',
      async () =>
        fetch(
          'https://www.speedrun.com/api/v1/users/j06dlnwj/personal-bests?embed=game,category.variables,level.variables'
        ).then((resp) => resp.json()),
      60 * 1000 * 5
    );
  }, []);

  return (
    <>
      <PageHead
        url="speedruns"
        title="Speedruns"
        description="Alex Craig's personal speedrun records"
      />

      <Section grow>
        <Container>
          <p>Test</p>
        </Container>
      </Section>
    </>
  );
}
