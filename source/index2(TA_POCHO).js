import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        const url = "https://ais.usvisa-info.com/es-mx/niv/users/sign_in";
        const email = "estrelladediosruiz97@gmail.com";
        const password = "dedios2002";

        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: false,
            slowMo: 2
        });

        // Open a new page
        const page = await browser.newPage();


        await page.goto(url);

        await page.waitForSelector('#user_email');
        await page.type('#user_email', email);

        await page.waitForSelector('#user_password');
        await page.type('#user_password', password);

        await page.click('#policy_confirmed')


        await Promise.all([
            page.waitForNavigation(), // Esperar a que la página se cargue completamente después del inicio de sesión
            await page.keyboard.press('Enter')
        ]);


        await Promise.all([
            page.waitForNavigation(), // Esperar a que la página se cargue completamente después de hacer clic en el botón
            await page.click('a[href="/es-mx/niv/schedule/57058704/continue_actions"]')
        ]);


        await Promise.all([
            page.waitForNavigation(), // Esperar a que la página se cargue completamente después de hacer clic en el botón
            page.click('#forms > ul > li:nth-child(3)')
        ]);
        


        await page.click('a[href="/es-mx/niv/schedule/61930796/appointment"]');


        await page.select('#appointments_consulate_appointment_facility_id', 'Matamoros');

        await page.click('#appointments_consulate_appointment_date_input');

        for (let i = 0; i < 20; i++) {
            await page.click('#ui-datepicker-div > div.ui-datepicker-group.ui-datepicker-group-last > div > a');
        }

        const options = await page.$$('#appointments_consulate_appointment_time option');
        const randomIndex = Math.floor(Math.random() * options.length);
        await options[randomIndex].click();

        console.log('Código continuando...');

        await page.select('#appointments_asc_appointment_facility_id', 'Matamoros ASC');

        await page.click('#appointments_asc_appointment_date');

        for (let i = 0; i < 20; i++) {
            await page.click('#ui-datepicker-div > div.ui-datepicker-group.ui-datepicker-group-last > div > a');
        }

        const appointmentTime = await page.$('#appointments_asc_appointment_time');
        const timeOptions = await appointmentTime.$$('option');
        const randomTimeIndex = Math.floor(Math.random() * timeOptions.length);
        await timeOptions[randomTimeIndex].click();

    } catch (error) {
        console.error("Ocurrió un error:", error);
    }

    console.log("Terminado.");

    await browser.close();
})();
