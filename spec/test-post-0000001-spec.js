'use babel';

import TestPost0000001 from '../lib/test-post-0000001';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('TestPost0000001', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('test-post-0000001');
  });

  describe('when the test-post-0000001:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.test-post-0000001')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'test-post-0000001:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.test-post-0000001')).toExist();

        let testPost0000001Element = workspaceElement.querySelector('.test-post-0000001');
        expect(testPost0000001Element).toExist();

        let testPost0000001Panel = atom.workspace.panelForItem(testPost0000001Element);
        expect(testPost0000001Panel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'test-post-0000001:toggle');
        expect(testPost0000001Panel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.test-post-0000001')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'test-post-0000001:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let testPost0000001Element = workspaceElement.querySelector('.test-post-0000001');
        expect(testPost0000001Element).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'test-post-0000001:toggle');
        expect(testPost0000001Element).not.toBeVisible();
      });
    });
  });
});
