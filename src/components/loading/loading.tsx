import loadingStyles from './loading.module.css';

export const Loading = () => {
  return(
    <div className={loadingStyles.background}>
      <div className={loadingStyles.image}></div>
      <div className={`${loadingStyles.image} ${loadingStyles.layer1}`}></div>
      <div className={`${loadingStyles.image} ${loadingStyles.layer2}`}></div>
      <div className={`${loadingStyles.image} ${loadingStyles.layer3}`}></div>
      <div className={`${loadingStyles.image} ${loadingStyles.layer4}`}></div>
    </div>
  )
}
