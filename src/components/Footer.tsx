import React from 'react';
import { AppBar, Toolbar, Typography, Container, Link, Paper, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { US, PL } from 'country-flag-icons/react/3x2'
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();

  const renderFlag = (language: string) => {
    if (language === 'en') {
      return <IconButton><US width={32} height={32} /></IconButton>;
    } else if (language === 'pl') {
      return <IconButton><PL width={32} height={32} /></IconButton>;
    }
    return null;
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <Paper component="footer" sx={{ position: 'relative', marginTop: 'auto' }}>
      <AppBar position="static" color="primary">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="body1" color="inherit">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </Typography>
            <Typography variant="body1" color="inherit" sx={{ flexGrow: 1 }}>
              <Link href="/polityka-prywatnosci" color="inherit">
                {t('footer.privacyPolicy')}
              </Link>
            </Typography>
            <FormControl style={{ marginLeft: '10px' }}>
              <InputLabel id="language-select-label">{t('footer.language')}</InputLabel>
              <Select
                labelId="language-select-label"
                id="language-select"
                value={i18n.language}
                onChange={handleLanguageChange}
                label={t('footer.language')}
                style={{ color: 'white' }}
                renderValue={(selected) => (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {renderFlag(selected)}
                    {t(`languages.${selected}`)}
                  </div>
                )}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="pl">Polski</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        </Container>
      </AppBar>
    </Paper>
  );
};

export default Footer;