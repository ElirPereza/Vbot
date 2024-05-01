import puppeteer from 'puppeteer';


const mail = 'estrelladediosruiz97@gmail.com';
const password = 'dedios2002';


const VBot = async () => {

    // Launch the browser and open a new blank page
    // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
    // - no default viewport (`defaultViewport: null` - website page will in full width and height)
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        slowMo: 2
    });

    // Open a new page
    const page = await browser.newPage();

    await page.setDefaultNavigationTimeout(0)
    // On this new page:
    // - open the "http://quotes.toscrape.com/" website
    // - wait until the dom content is loaded (HTML is ready)
    await page.goto("https://ais.usvisa-info.com/es-mx/niv/users/sign_in", {
        waitUntil: "domcontentloaded"
        // timeout: 0

    });


    //INICIO DE SESION
    await page.type('input[type="email"]', mail)
    await page.type('input[type="password"]', password)
    await page.click('#policy_confirmed')
    await page.keyboard.press('Enter')

    //  ESPERAR A QUE LA PAGINA CARGUE
    await Promise.all([
        page.waitForNavigation(), // Esperar a que la página se cargue completamente después del inicio de sesión
        await page.keyboard.press('Enter')
    ]);

    //AQUI EMPIEZA LA NAVEGACION DESPUES DE INCIAR SESSION
    await Promise.all([
        page.waitForNavigation(),
        await page.click('a[href="/es-mx/niv/schedule/57058704/continue_actions"]')
    ]);

    //SELECCIONAR OPCION DE CAMBIAR FECHA
    await Promise.all([
        page.waitForNavigation(),
        page.click('#forms > ul > li:nth-child(3)'),
        await page.click('a[href="/es-mx/niv/schedule/57058704/appointment"]')
    ]);


    //REAGENDAR CITA
    await Promise.all([
        await page.waitForSelector('#appointments_consulate_appointment_facility_id'),
        await page.select('#appointments_consulate_appointment_facility_id', '67'),
        // page.click('#appointments_consulate_appointment_date_input > a')
    ]);




};

VBot()

