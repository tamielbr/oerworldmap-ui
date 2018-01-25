import React from 'react'
import PropTypes from 'prop-types'
import Link from './Link'
import withi18n from './withi18n'
import FullModal from './FullModal'
import '../styles/components/Feed.pcss'
import Icon from './Icon'

const Feed = ({translate, member}) => (
  <div className="Feed">
    <FullModal>
      <h2 className="title">
        {translate('Feed.title')}
      </h2>
      <ul className="list">
        {member.map(item => (
          <li key={item.about['@id']}>
            <Link href={`/resource/${item.about['@id']}`}>
              <Icon type={item['@type']} />
              &nbsp;{translate(item.about.name) || item.about['@id']}
            </Link>
          </li>
        ))}
      </ul>
      <div className="more">
        <Link href="/resource/?size=20&sort=dateCreated:desc" >{translate('Feed.more')}</Link>
      </div>
    </FullModal>
  </div>
)

Feed.propTypes = {
  translate: PropTypes.func.isRequired,
  member: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default withi18n(Feed)
