import puppeteer from 'puppeteer';


const mail = 'estrelladediosruiz97@gmail.com';
const password = 'dedios2002';


const VBot = async () => {

    // Launch the browser and open a new blank page
    // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
    // - no default viewport (`defaultViewport: null` - website page will in full width and height)
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        slowMo: 2
    });

    // Open a new page
    const page = await browser.newPage();

    // On this new page:
    // - open the "http://quotes.toscrape.com/" website
    // - wait until the dom content is loaded (HTML is ready)
    await page.goto("https://ais.usvisa-info.com/es-mx/niv/users/sign_in", {
        waitUntil: "domcontentloaded",
    });


    //INICIO DE SESION
    await page.type('input[type="email"]', mail)
    await page.type('input[type="password"]', password)
    await page.click('#policy_confirmed')
    await page.keyboard.press('Enter')

    //  ESPERAR A QUE LA PAGINA CARGUE
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });


    //NAVEGACION DESPUES DE INCIAR SESION

    await page.click('a[href="/es-mx/niv/schedule/57058704/continue_actions"]')

    //  ESPERAR A QUE LA PAGINA CARGUE

    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await page.waitForNavigation(5000);

    // const element = await page.waitForSelector('//*[@id="forms"]/ul/li[3]');
    // await element.click();
    await page.evaluate(() => {
        document.querySelectorAll('.accordion-item')[2].querySelector('.accordion-title').click();
      });
      // Esperar 4 segundos antes de hacer clic en el enlace de Reprogramar cita
  await page.waitForTimeout(4000);

      await page.evaluate(() => {
        document.querySelector('a[href="/es-mx/niv/schedule/57058704/appointment"]').click();
      });










};

VBot()

