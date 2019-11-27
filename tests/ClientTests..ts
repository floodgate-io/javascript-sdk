import { expect, assert } from 'chai';
import 'mocha';
import * as floodgateClient from "../src/index";

describe('Test Floodgate Client Object', () => { 
    it('should fail to create instance with no arguments', () => {
      // @ts-ignore <ts(2554)>
      expect(() => floodgateClient.createClient()).to.throw(Error);
    });

    it('should reate instance of floodgate client', () => {
      const result = floodgateClient.createClient("sdk-key");
      assert.isDefined(result);
    });
});

describe('Test Floodgate Client Object', () => {
  // const sdkKey = '927f4418d15e9a81c834dcfe1c9f3d91d994cf9aff9813fb75b94f2e44f5';
  const url = {
    flags: 'https://s3-ap-southeast-1.amazonaws.com/cdn.floodgate.io/tests/test-flags.json',
    rollouts: 'https://s3-ap-southeast-1.amazonaws.com/cdn.floodgate.io/tests/test-flags-rollout.json',
    targets: 'https://s3-ap-southeast-1.amazonaws.com/cdn.floodgate.io/tests/test-flags-target.json',
    all: 'https://s3-ap-southeast-1.amazonaws.com/cdn.floodgate.io/tests/test-flags-rollout-target.json'
  };

  context('with flags only', () => {
    it('should return grey', (done) => {
      const config = {
        configUrl: url.flags,
        consoleLog: false,
        refreshInterval: 3600
      };
  
      const client = floodgateClient.createAutoUpdateClient("invalid", config);
  
      client.on('ready', function() {
        let key = 'invalid-key';
        const colour = client.GetValue(key, 'grey');
        expect(colour).to.equal('grey'); 
        done();
      });
    });

    it('should return pink', (done) => {
      const config = {
        configUrl: url.flags,
        consoleLog: false,
        refreshInterval: 3600
      };
  
      const client = floodgateClient.createAutoUpdateClient("invalid", config);
  
      client.on('ready', function() {
        let key = 'background-colour';
        const colour = client.GetValue(key, 'grey');
        expect(colour).to.equal('pink'); 
        done();
      });
    });
  });
  
  context('with targets', () => {
    it('should return yellow', (done) => {
      const config = {
        configUrl: url.targets,
        consoleLog: false,
        refreshInterval: 3600
      };

      const client = floodgateClient.createAutoUpdateClient("invalid", config);

      const customAttributes = {
        name: "Peter Parker",
        country: "US"
      };
      const user = floodgateClient.createUser("d2405fc0-c9cd-49e7-a07e-bf244d6d360b", "spiderman@marvel.com", customAttributes);

      client.on('ready', function() {
        let key = 'background-colour';
        const colour = client.GetValue(key, 'grey', user);
        expect(colour).to.equal('yellow'); 
        done();
      });
    });

    it('should return orange', (done) => {
      const config = {
        configUrl: url.targets,
        consoleLog: false,
        refreshInterval: 3600
      };

      const client = floodgateClient.createAutoUpdateClient("invalid", config);

      const customAttributes = {
        name: "Peter Parker",
        country: "UK"
      };
      const user = floodgateClient.createUser("d2405fc0-c9cd-49e7-a07e-bf244d6d360b", "spiderman@marvel.com", customAttributes);

      client.on('ready', function() {
        let key = 'background-colour';
        const colour = client.GetValue(key, 'grey', user);
        expect(colour).to.equal('orange'); 
        done();
      });
    });

    it('should return brown', (done) => {
      const config = {
        configUrl: url.targets,
        consoleLog: false,
        refreshInterval: 3600
      };

      const client = floodgateClient.createAutoUpdateClient("invalid", config);

      const user = floodgateClient.createUser("d2405fc0-c9cd-49e7-a07e-bf244d6d360b", "spiderman@marvel.com");

      client.on('ready', function() {
        let key = 'background-colour';
        const colour = client.GetValue(key, 'grey', user);
        expect(colour).to.equal('brown'); 
        done();
      });
    });
  });

  context('with rollouts', () => {

    const variations = [
      { id: 'd2405fc0-c9cd-49e7-a07e-bf244d6d360b', expected: 'blue' },
      { id: '4d5817c5-4450-4cd4-b035-e24c2b72d50a', expected: 'purple' },
      { id: '1dd97efd-62eb-418c-b2fe-11dd0ca188e0', expected: 'brown' }, // red
      { id: 'cb3c2d9c-9908-4f80-b7a4-c3cf2aa4d134', expected: 'pink' }, // yellow
      { id: 'da50fc56-16b5-4fbd-960a-89405968e881', expected: 'blue' }, // green
      { id: '1527d16f-f287-49ba-bc61-bf86d39a2ab2', expected: 'red' }, // brown
      { id: '68450bec-70c1-4b49-91ba-5c756b2b3191', expected: 'orange' }, // pink
      { id: '2323e039-5f77-4391-b478-0b04f6541094', expected: 'yellow' } // orange
    ];

    for (const variation of variations) {
      it(`should return ${variation.expected}`, (done) => {
        const config = {
          configUrl: url.rollouts,
          consoleLog: false,
          refreshInterval: 3600
        };
  
        const client = floodgateClient.createAutoUpdateClient("invalid", config);
  
        const user = floodgateClient.createUser(variation.id);
  
        client.on('ready', function() {
          let key = 'background-colour';
          const colour = client.GetValue(key, 'grey', user);

          // console.log(`${variation.expected} = ${colour}`);
          expect(colour).to.equal(variation.expected); 
          done();
        });
      });
    }




    // it('should return blue', (done) => {
    //   const config = {
    //     configUrl: url.rollouts,
    //     consoleLog: false,
    //     refreshInterval: 3600
    //   };

    //   const client = floodgateClient.createAutoUpdateClient("invalid", config);

    //   const user = floodgateClient.createUser("d2405fc0-c9cd-49e7-a07e-bf244d6d360b");

    //   client.on('ready', function() {
    //     let key = 'background-colour';
    //     const colour = client.GetValue(key, 'grey', user);
    //     expect(colour).to.equal('blue'); 
    //     done();
    //   });
    // });

    // it('should return purple', (done) => {
    //   const config = {
    //     configUrl: url.rollouts,
    //     consoleLog: false,
    //     refreshInterval: 3600
    //   };

    //   const client = floodgateClient.createAutoUpdateClient("invalid", config);

    //   const user = floodgateClient.createUser("4d5817c5-4450-4cd4-b035-e24c2b72d50a");

    //   client.on('ready', function() {
    //     let key = 'background-colour';
    //     const colour = client.GetValue(key, 'grey', user);
    //     expect(colour).to.equal('purple'); 
    //     done();
    //   });
    // });
  });
});