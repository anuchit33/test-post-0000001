'use babel';

import TestPost0000001View from './test-post-0000001-view';
import { CompositeDisposable } from 'atom';

export default {

  testPost0000001View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.testPost0000001View = new TestPost0000001View(state.testPost0000001ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.testPost0000001View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'test-post-0000001:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.testPost0000001View.destroy();
  },

  serialize() {
    return {
      testPost0000001ViewState: this.testPost0000001View.serialize()
    };
  },

  toggle() {
    console.log('TestPost0000001 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
