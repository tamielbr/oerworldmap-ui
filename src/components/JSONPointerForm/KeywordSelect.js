import React from 'react'
import PropTypes from 'prop-types'
import CreatableSelect from 'react-select/lib/Creatable'

// import 'react-select/dist/react-select.css'

import withFormData from './withFormData'
import withApi from '../withApi'

class KeywordSelect extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      options: []
    }
  }

  componentDidMount() {
    this.props.api.get('/resource/?size=0').then(response => {
      const options = response.aggregations['sterms#about.keywords'].buckets
        .map(keyword => ({value: keyword.key, label: keyword.key}))
      this.setState({options})
    })
  }

  render() {
    const {
      name, value, setValue, property, className, title, translate, errors, formId, required
    } = this.props

    return (
      <div
        className={`KeywordSelect ${property || ''} ${className} ${errors.length ? 'hasError': ''}`.trim()}
        role="group"
        aria-labelledby={`${formId}-${name}-label`}
      >
        <div
          className={`label ${required ? 'required' : ''}`.trim()}
          id={`${formId}-${name}-label`}
        >
          {translate(title)}
        </div>
        {errors.map((error, index) => (
          <div className="error" key={index}>{error.message}</div>
        ))}
        <CreatableSelect
          name={name}
          value={value.map(value => ({value, label:value}))}
          options={this.state.options}
          onChange={selected => setValue(selected.map(option => option.value))}
          placeholder={`${translate('ClientTemplates.resource_typehead.search')} ${translate(title)}`}
          isClearable={false}
          formatCreateLabel={(label) => `${translate('create')} "${label}"`}
          isMulti
          classNamePrefix='Select'
          components={{
            DropdownIndicator: () => <i className="fa fa-chevron-down" />
          }}
        />
      </div>
    )
  }

}

KeywordSelect.propTypes = {
  name: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.object),
  property: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  translate: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.any),
  api: PropTypes.objectOf(PropTypes.any).isRequired,
  setValue: PropTypes.func.isRequired,
  formId: PropTypes.string.isRequired,
  required: PropTypes.bool
}

KeywordSelect.defaultProps = {
  errors: [],
  property: undefined,
  title: '',
  className: '',
  value: [],
  required: false
}

export default withApi(withFormData(KeywordSelect))
