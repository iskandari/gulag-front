/* eslint-disable jsx-a11y/no-static-element-interactions,
jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// ico
// import closeIcon from '../icons/btn-close.svg';

// styled
import Top from './Top';
import FullScreenButton from './FullScreenButton';
import PreviewsContainer from './PreviewsContainer';
import ImgPreviewContainer from './ImgPreviewContainer';
import FullScreenContainer from './FullScreenContainer';
import FullScreenTop from './FullScreenTop';
import NavButton from './NavButton';

// import { CardButton } from '../StyledButtons';

class Gallery extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePhotoId: 0,
      isFullScreen: false
    };
    this.onPreviewClick = this.onPreviewClick.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
    this.keydown = this.keydown.bind(this);
    this.changeActivePhoto = this.changeActivePhoto.bind(this);
  }

  onPreviewClick(i) {
    const { left } = this[`preview${i}`].getBoundingClientRect();
    const containerWidth = this.previewContainer.getBoundingClientRect().width;
    const scrollBy = left - (containerWidth / 2);

    if (!this.state.isFullScreen) {
      this.previewContainer.scrollTo(scrollBy, 0);
      // this.previewContainer.scrollLeft = this.previewContainer.scrollLeft + scrollBy;
    } else {
      this.previewFullScreenContainer.scrollTo(scrollBy, 0);
      // this.previewFullScreenContainer.scrollLeft =
      //   this.previewFullScreenContainer.scrollLeft + scrollBy;
    }
    this.setState({ activePhotoId: i });
  }

  toggleFullScreen() {
    this.setState(({ isFullScreen }) => ({ isFullScreen: !isFullScreen }));

    // eslint-disable-next-line no-unused-expressions
    if (!this.state.isFullScreen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', this.keydown);
    } else {
      document.body.style.overflow = 'initial';
      document.removeEventListener('keydown', this.keydown);
    }
  }

  keydown(e) {
    if (e.keyCode === 39) {
      this.changeActivePhoto(1);
    }
    if (e.keyCode === 37) {
      this.changeActivePhoto(-1);
    }
    if (e.keyCode === 27) {
      e.preventDefault();
      this.setState({ isFullScreen: false });
      document.body.style.overflow = 'initial';
      document.removeEventListener('keydown', this.keydown);
    }
  }

  changeActivePhoto(val) {
    const { length } = this.props.photos;
    const newActivePhotoId = this.state.activePhotoId + val;

    if (length > newActivePhotoId && newActivePhotoId > -1) {
      this.setState({ activePhotoId: newActivePhotoId });
    } else if (newActivePhotoId > length - 1) {
      this.setState({ activePhotoId: 0 });
    } else {
      this.setState({ activePhotoId: length - 1 });
    }
  }

  render() {
    return (
      <div style={{ breakInside: 'avoid' }}>
        <Top>
          <div style={{ display: 'inline-block', position: 'relative' }}>
            <img
              src={this.props.photos[this.state.activePhotoId]}
              alt=''
              onClick={this.toggleFullScreen}
            />
            <FullScreenButton onClick={this.toggleFullScreen} />
          </div>
        </Top>
        <PreviewsContainer
          innerRef={(ref) => {
            this.previewContainer = ref;
          }}
        >
          {
            this.props.photos.map((img, i) => (
              <ImgPreviewContainer
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                innerRef={(ref) => {
                  this[`preview${i}`] = ref;
                }}
                isActive={this.state.activePhotoId === i}
                onClick={this.onPreviewClick.bind(null, i)}
              >
                <img
                  src={img}
                  alt=''
                />
              </ImgPreviewContainer>
            ))
          }
        </PreviewsContainer>
        {
          this.state.isFullScreen &&
          <FullScreenContainer>
            <div
              style={{ position: 'absolute', width: '100%', height: '100%' }}
              onClick={this.toggleFullScreen}
            />
            {/* <CardButton onClick={this.toggleFullScreen}> */}
            {/* <img src={closeIcon} alt='' /> */}
            {/* </CardButton> */}
            <NavButton
              position='left'
              onClick={this.changeActivePhoto.bind(null, -1)}
            />
            <FullScreenTop>
              <img
                src={this.props.photos[this.state.activePhotoId]}
                onClick={e => e.stopPropagation()}
                alt=''
              />
            </FullScreenTop>
            <PreviewsContainer
              innerRef={(ref) => {
                this.previewFullScreenContainer = ref;
              }}
            >
              {
                this.props.photos.map((img, i) => (
                  <ImgPreviewContainer
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    isActive={this.state.activePhotoId === i}
                    onClick={(e) => {
                      e.stopPropagation();
                      this.onPreviewClick(i);
                    }}
                  >
                    <img
                      src={img}
                      alt=''
                    />
                  </ImgPreviewContainer>
                ))
              }
            </PreviewsContainer>
            <NavButton
              position='right'
              onClick={this.changeActivePhoto.bind(null, 1)}
            />
          </FullScreenContainer>
        }
      </div>
    );
  }
}

Gallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired
};

export default Gallery;
