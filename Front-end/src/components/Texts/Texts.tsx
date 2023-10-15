import * as T from "./Texts.styles";

interface TextProps {
  title?: string;
  subtitle?: string;
  intertitle?: string;
  paragraph?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const HeadingTitle: React.FC<TextProps> = ({
  title,
  className,
  style,
  ...otherProps
}) => {
  return (
    <T.HeadingTitleStyled className={className} style={style} {...otherProps}>
      {title}
    </T.HeadingTitleStyled>
  );
};

export const HeadingSubtitle: React.FC<TextProps> = ({
  subtitle,
  className,
  style,
  ...otherProps
}) => {
  return (
    <T.HeadingSubtitleStyled className={className} style={style} {...otherProps}>
      {subtitle}
    </T.HeadingSubtitleStyled>
  );
};

export const HeadingInterTitle: React.FC<TextProps> = ({
  intertitle,
  className,
  style,
  ...otherProps
}) => {
  return (
    <T.HeadingInterTitleStyled className={className} style={style} {...otherProps}>
      {intertitle}
    </T.HeadingInterTitleStyled>
  );
};

export const Paragraph: React.FC<TextProps> = ({
  paragraph,
  className,
  style,
  ...otherProps
}) => {
  return (
    <T.ParagraphStyled className={className} style={style} {...otherProps}>
      {paragraph}
    </T.ParagraphStyled>
  );
};
