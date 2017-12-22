/* global window */
import React from 'react'
import PropTypes from 'prop-types'

import withEmitter from './withEmitter'

import '../styles/components/Columns.pcss'

class Columns extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      showColumns: this.props.size ? true : false
    }
  }

  componentDidMount() {
    this.props.emitter.on('toggleColumns', () => {
      this.setState({showColumns:!this.state.showColumns})

      const ColumnList = this.columns.querySelector('.ColumnList')
      const PagedCollection = this.columns.querySelector('.PagedCollection')

      ColumnList.classList.remove('noDisplay')
      PagedCollection.classList.remove('noDisplay')

      window.setTimeout(()=> {
        if (!this.state.showColumns) {
          ColumnList.classList.add('noDisplay')
          PagedCollection.classList.add('noDisplay')
        } else {
          ColumnList.classList.remove('noDisplay')
          PagedCollection.classList.remove('noDisplay')
        }
      },1200)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({showColumns: nextProps.size ? true : false})
  }

  render() {
    return (
      <aside
        className={`Columns ${this.state.showColumns ? '' : 'hideColumns'}`}
        ref={col => this.columns = col}
      >
        {this.props.children}
      </aside>
    )
  }

}

Columns.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.number.isRequired,
  emitter: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default withEmitter(Columns)
